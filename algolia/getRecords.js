const fs = require('fs');
const path = require('path');
const url = require('url');
const algoliasearch = require('algoliasearch');
// Run using node ./algolia/getRecords.js

const client = algoliasearch('5UAX3T19GE', 'eed09e4a3d303e35daed718838184efd');

const index = client.initIndex('prod');
const contentAlias = {};
const records = [];
const specialChars = ['#', '|', '`', '\\', '--', '\n', '  ', '[', ']', '!', '{', '}', '- ', '*'];

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
    let mainContent = content.split('\n').slice(3).join(' ');
    mainContent = mainContent.replace(/```.*?```/g, '');
    Object.keys(contentAlias).map(
        (contentTag) => (mainContent = mainContent.replace(contentTag, contentAlias[contentTag]))
    );
    specialChars.map((specialChar) => (mainContent = mainContent.split(specialChar).join(' ')));
    return mainContent.toString();
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
// try {
//     fs.writeFileSync('./records.json', JSON.stringify(records));
// } catch (err) {
//     console.error(err);
// }
index.replaceAllObjects(records);
