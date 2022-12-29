const fs = require('fs');
const path = require('path');
const url = require('url');
const {
    toCamelCase,
    getKeywords,
    getPlatform,
    getTitle,
    getHeadings,
    getCleanedContent
} = require('./helper');

exports.cacheContentAlias = function cacheContentAlias(propPath) {
    const contentAlias = {};
    const contents = fs.readdirSync(propPath);
    contents.forEach((content) => {
        contentAlias[`<Content alias="${toCamelCase(content.toString().slice(0, -3))}" />`] = fs
            .readFileSync(path.resolve(propPath, content))
            .toString();
    });
    return contentAlias;
};

exports.getRecordObject = function getRecordObject(filename, folderPath, basePath, contentAlias) {
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
        content: getCleanedContent(fileContent, contentAlias),
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

exports.createRecords = function createRecords(
    folderPaths,
    records,
    basePath,
    getRecordObject,
    contentAlias,
    pushRecursively
) {
    folderPaths.map((folderPath) => {
        const contents = fs.readdirSync(folderPath);
        const subFolders = contents.filter((content) =>
            fs.lstatSync(path.resolve(folderPath, content)).isDirectory()
        );
        const subFolderPaths = subFolders.map((subFolder) => path.resolve(folderPath, subFolder));

        if (subFolderPaths.length) {
            createRecords(
                subFolderPaths,
                records,
                basePath,
                getRecordObject,
                contentAlias,
                pushRecursively
            );
        } else {
            contents.forEach((content) => {
                if (content.includes('.mdx')) {
                    const obj = getRecordObject(content, folderPath, basePath, contentAlias);
                    pushRecursively(obj, records);
                }
            });
        }
    });
};
