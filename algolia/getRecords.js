const fs = require('fs');
const path = require('path');
const url = require('url');
const algoliasearch = require('algoliasearch');
// Run using node ./algolia/getRecords.js

const NEXT_PUBLIC_ALGOLIA_APP_ID = '5UAX3T19GE';
const NEXT_PUBLIC_ALGOLIA_INDEX = 'test';
const NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY = '6b2fcf18157b00a2c7f33452512da0ba';
const NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY = 'eed09e4a3d303e35daed718838184efd';

const client = algoliasearch(NEXT_PUBLIC_ALGOLIA_APP_ID, NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY);

const index = client.initIndex(NEXT_PUBLIC_ALGOLIA_INDEX);

const stopwords = [
    '#',
    '\n',
    '|',
    '[',
    ']',
    'a',
    'about',
    'above',
    'after',
    'again',
    'against',
    'all',
    'am',
    'an',
    'and',
    'any',
    'are',
    "aren't",
    'as',
    'at',
    'be',
    'because',
    'been',
    'before',
    'being',
    'below',
    'between',
    'both',
    'but',
    'by',
    "can't",
    'cannot',
    'could',
    "couldn't",
    'did',
    "didn't",
    'do',
    'does',
    "doesn't",
    'doing',
    "don't",
    'down',
    'during',
    'each',
    'few',
    'for',
    'from',
    'further',
    'had',
    "hadn't",
    'has',
    "hasn't",
    'have',
    "haven't",
    'having',
    'he',
    "he'd",
    "he'll",
    "he's",
    'her',
    'here',
    "here's",
    'hers',
    'herself',
    'him',
    'himself',
    'his',
    'how',
    "how's",
    'i',
    "i'd",
    "i'll",
    "i'm",
    "i've",
    'if',
    'in',
    'into',
    'is',
    "isn't",
    'it',
    "it's",
    'its',
    'itself',
    "let's",
    'me',
    'more',
    'most',
    "mustn't",
    'my',
    'myself',
    'no',
    'nor',
    'not',
    'of',
    'off',
    'on',
    'once',
    'only',
    'or',
    'other',
    'ought',
    'our',
    'ours',
    'ourselves',
    'out',
    'over',
    'own',
    'same',
    "shan't",
    'she',
    "she'd",
    "she'll",
    "she's",
    'should',
    "shouldn't",
    'so',
    'some',
    'such',
    'than',
    'that',
    "that's",
    'the',
    'their',
    'theirs',
    'them',
    'themselves',
    'then',
    'there',
    "there's",
    'these',
    'they',
    "they'd",
    "they'll",
    "they're",
    "they've",
    'this',
    'those',
    'through',
    'to',
    'too',
    'under',
    'until',
    'up',
    'very',
    'was',
    "wasn't",
    'we',
    "we'd",
    "we'll",
    "we're",
    "we've",
    'were',
    "weren't",
    'what',
    "what's",
    'when',
    "when's",
    'where',
    "where's",
    'which',
    'while',
    'who',
    "who's",
    'whom',
    'why',
    "why's",
    'with',
    "won't",
    'would',
    "wouldn't",
    'you',
    "you'd",
    "you'll",
    "you're",
    "you've",
    'your',
    'yours',
    'yourself',
    'yourselves'
];
const contentAlias = {};
const records = [];

const getPlatform = (path) => {
    const mapping = {
        'server-side': 'Server-side',
        javascript: 'JavaScript',
        'react-native': 'React Native',
        ios: 'iOS',
        flutter: 'Flutter',
        android: 'Android'
    };

    let platform = '';
    Object.keys(mapping).forEach((term) => {
        if (path.toString().includes(term)) {
            platform = mapping[term];
            return;
        }
    });
    return platform;
};

const toCamelCase = (fileName) => {
    const formattedName = fileName
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join('');
    return formattedName[0].toLowerCase() + formattedName.slice(1);
};

const getCleanedContent = (content) => {
    Object.keys(contentAlias).map(
        (contentTag) => (content = content.replace(contentTag, contentAlias[contentTag]))
    );
    const contentArray = content.split(' ');
    const cleanedContentArray = contentArray.map((word) => (stopwords.includes(word) ? '' : word));
    const cleanedContent = cleanedContentArray.join(' ').replaceAll('\n', ' ');
    return cleanedContent.toString();
};

const getHeadings = (content) => {
    const headings = content
        .split('\n')
        .filter((line) => line.match(/#{1,3}\s/))
        .map((line) => {
            const [, , title] = line.match(/(#{1,3})\s(.*)/);
            return title;
        });
    return headings;
};

const getKeywords = (content) => {
    const headings = content
        .split('\n')
        .filter((line) => line.match('keywords: '))
        .join('');
    return headings.split('keywords: ')[1] || [];
};

const getTitle = (content) => {
    const headings = content
        .split('\n')
        .filter((line) => line.match('title: '))
        .join('');
    return headings.split('title: ')[1] || [];
};

const getRecordObject = (filename, folderPath) => {
    const link = url.pathToFileURL(path.resolve(folderPath, filename)).toString().slice(70, -4);

    const fileContent = fs
        .readFileSync(path.resolve(folderPath, filename), {
            encoding: 'utf8',
            flag: 'r'
        })
        .toString();

    const platform = getPlatform(link);
    const fileRecord = {
        title: getTitle(fileContent),
        link: link,
        keywords: getKeywords(fileContent),
        headings: getHeadings(fileContent),
        content: getCleanedContent(fileContent),
        platformName: platform,
        objectID: link
    };
    return fileRecord;
};

const pushRecursively = (obj) => {
    if (Buffer.byteLength(JSON.stringify(obj)) < 80000) {
        records.push(obj);
    } else {
        const leftChild = { ...obj };
        leftChild.content = leftChild.content.slice(0, leftChild.content.length / 2);
        leftChild.objectID = obj.objectID + '-left';
        const rightChild = { ...obj };
        rightChild.content = rightChild.content.slice(rightChild.content.length / 2);
        rightChild.objectID = obj.objectID + '-right';
        pushRecursively(leftChild);
        pushRecursively(rightChild);
    }
};

const createRecords = (folderPaths) => {
    folderPaths.map((folderPath) => {
        const contents = fs.readdirSync(folderPath);
        const subFolders = contents.filter((content) =>
            fs.lstatSync(path.resolve(folderPath, content)).isDirectory()
        );
        const subFolderPaths = subFolders.map((subFolder) => path.resolve(folderPath, subFolder));

        if (subFolderPaths.length) {
            createRecords(subFolderPaths);
        } else {
            contents.forEach((content) => {
                if (content.includes('.mdx')) {
                    const obj = getRecordObject(content, folderPath);
                    pushRecursively(obj);
                }
            });
        }
    });
};

const cacheContentAlias = (basePath) => {
    const contents = fs.readdirSync(basePath);
    contents.forEach((content) => {
        contentAlias[`<Content alias="${toCamelCase(content.toString().slice(0, -3))}" />`] =
            fs.readFileSync(path.resolve(basePath, content), {
                encoding: 'utf8',
                flag: 'r'
            });
    });
};

cacheContentAlias(path.resolve(__dirname, '../common'));
createRecords([path.resolve(__dirname, '../docs')]);
index.replaceAllObjects(records);
