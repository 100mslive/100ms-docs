const fs = require('fs');
const path = require('path');
const url = require('url');

exports.cacheContentAlias = function cacheContentAlias(propPath) {
    const contents = fs.readdirSync(propPath);
    contents.forEach((content) => {
        contentAlias[`<Content alias="${toCamelCase(content.toString().slice(0, -3))}" />`] = fs
            .readFileSync(path.resolve(propPath, content))
            .toString();
    });
    return contentAlias;
};

exports.toCamelCase = function toCamelCase(fileName) {
    const formattedName = fileName
        .split('-')
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join('');
    return formattedName[0].toLowerCase() + formattedName.slice(1);
};

exports.getCleanedContent = function getCleanedContent(content, contentAlias) {
    const specialChars = [
        '#',
        '|',
        '`',
        '\\',
        '--',
        '\n',
        '  ',
        '[',
        ']',
        '!',
        '{',
        '}',
        '- ',
        '*',
        '> Note :',
        '<Tab',
        '/>'
    ];
    let mainContent = content.split('\n').slice(3).join(' ');
    // Removes code blocks, might show up in search result snippets otherwise
    mainContent = mainContent.replace(/```.*?```/g, '');
    Object.keys(contentAlias).forEach((contentTag) => {
        mainContent = mainContent.replace(contentTag, contentAlias[contentTag]);
    });
    specialChars.forEach((specialChar) => {
        mainContent = mainContent.split(specialChar).join(' ');
    });
    return mainContent.toString();
};

exports.getHeadings = function getHeadings(content) {
    // Selects h1, h2, h3 headings
    const headings = content
        .split('\n')
        .filter((line) => line.match(/#{1,3}\s/))
        .map((line) => {
            const [, , title] = line.match(/(#{1,3})\s(.*)/);
            return title;
        });
    return headings;
};

exports.getKeywords = function getKeywords(content) {
    const keywords = content
        .split('\n')
        .filter((line) => line.match('keywords: '))
        .join('');
    return keywords.split('keywords: ')[1] || [];
};

exports.getTitle = function getTitle(content) {
    const title = content
        .split('\n')
        .filter((line) => line.match('title: '))
        .join('');
    return title.split('title: ')[1] || [];
};

exports.getPlatform = function getPlatform(pathString) {
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
        if (pathString.toString().includes(term)) platform = mapping[term];
    });
    return platform;
};

exports.getRecordObject = function getRecordObject(filename, folderPath, basePath) {
    const link = url
        .pathToFileURL(path.resolve(folderPath, filename))
        .toString()
        .split(basePath)[1]
        .slice(0, -4);

    const fileContent = fs.readFileSync(path.resolve(folderPath, filename)).toString();

    const platform = getPlatform(link);
    const fileRecord = {
        title: getTitle(fileContent),
        link,
        keywords: getKeywords(fileContent),
        headings: getHeadings(fileContent),
        content: getCleanedContent(fileContent),
        platformName: platform,
        objectID: link
    };
    return fileRecord;
};

exports.pushRecursively = function pushRecursively(obj, records) {
    if (Buffer.byteLength(JSON.stringify(obj)) < 80000) {
        // @ts-ignore
        records.push(obj);
    } else {
        const leftChild = { ...obj };
        leftChild.content = leftChild.content.slice(0, leftChild.content.length / 2);
        leftChild.objectID = `${obj.objectID}-left`;
        const rightChild = { ...obj };
        rightChild.content = rightChild.content.slice(rightChild.content.length / 2);
        rightChild.objectID = `${obj.objectID}-right`;
        pushRecursively(leftChild);
        pushRecursively(rightChild);
    }
};

exports.createRecords = function createRecords(folderPaths, records, basePath) {
    folderPaths.map((folderPath) => {
        const contents = fs.readdirSync(folderPath);
        const subFolders = contents.filter((content) =>
            fs.lstatSync(path.resolve(folderPath, content)).isDirectory()
        );
        const subFolderPaths = subFolders.map((subFolder) => path.resolve(folderPath, subFolder));

        if (subFolderPaths.length) {
            createRecords(subFolderPaths, records, basePath);
        } else {
            contents.forEach((content) => {
                if (content.includes('.mdx')) {
                    const obj = getRecordObject(content, folderPath, basePath);
                    pushRecursively(obj, records);
                }
            });
        }
    });
};
