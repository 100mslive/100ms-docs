const fs = require('fs');
const path = require('path');
const url = require('url');

// Run using node ./algolia/getRecords.js

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

const getCleanedContent = (content) => {
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

const getRecordObject = (filename, folderPath) => {
    const link = url.pathToFileURL(path.resolve(folderPath, filename)).toString().slice(70, -4);

    const fileContent = fs.readFileSync(path.resolve(folderPath, filename), {
        encoding: 'utf8',
        flag: 'r'
    });

    const platform = getPlatform(link);
    const fileRecord = {
        title: filename,
        link: link,
        associated_terms: [],
        headings: getHeadings(fileContent),
        content: getCleanedContent(fileContent),
        platformName: platform,
        objectID: link
    };
    return fileRecord;
};

const records = [];

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

const printAllFolders = (folderPaths) => {
    folderPaths.map((folderPath) => {
        const contents = fs.readdirSync(folderPath);
        const subFolders = contents.filter((content) =>
            fs.lstatSync(path.resolve(folderPath, content)).isDirectory()
        );
        const subFolderPaths = subFolders.map((subFolder) => path.resolve(folderPath, subFolder));

        if (subFolderPaths.length) {
            printAllFolders(subFolderPaths);
        } else {
            contents.forEach((content) => {
                const obj = getRecordObject(content, folderPath);
                pushRecursively(obj);
            });
        }
    });
};

printAllFolders([path.resolve(__dirname, '../docs')]);
console.log(records);
console.log(records.length, 'records created');

try {
    fs.writeFileSync('./records.json', JSON.stringify(records));
    // file written successfully
} catch (err) {
    console.error(err);
}
