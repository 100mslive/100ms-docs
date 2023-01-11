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

const slugify = (text) =>
    text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

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

exports.getSectionContent = function getSectionContent(headers, pageContent, index, fileRecords) {
    if (headers.length < 2) return pageContent;

    let followingContent;

    if (index === 0) {
        followingContent = pageContent;
    } else {
        const lastSectionContent = fileRecords[index - 1].content;
        followingContent = pageContent.split(lastSectionContent)[1];
        if (index === headers.length - 1) return followingContent;
    }
    return followingContent.split(headers[index + 1])[0];
};

exports.getRecordObject = function getRecordObject(
    filename,
    folderPath,
    basePath,
    contentAlias,
    getSectionContent,
    splitSectionLevel = false
) {
    const link = url
        .pathToFileURL(path.resolve(folderPath, filename))
        .toString()
        .split(basePath)[1]
        .slice(0, -4);

    const fileContent = fs.readFileSync(path.resolve(folderPath, filename)).toString();
    const platform = getPlatform(link);
    const headers = getHeadings(fileContent);

    if (splitSectionLevel) {
        const fileRecords = [];
        headers.forEach((header, index) => {
            const fileRecord = {
                title: header,
                link: `${link}#${slugify(header)}`,
                platformName: platform,
                objectID: `${link}#${slugify(header)}-${index}`,
                headers: [header],
                keywords: [],
                content: getSectionContent(headers, fileContent, index, fileRecords)
            };
            fileRecords.push(fileRecord);
        });
        return fileRecords;
    } else {
        const fileRecord = {
            title: getTitle(fileContent),
            link,
            keywords: getKeywords(fileContent),
            headers,
            content: getCleanedContent(fileContent, contentAlias),
            platformName: platform,
            objectID: link
        };
        return [fileRecord];
    }
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
    pushRecursively,
    getSectionContent
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
                pushRecursively,
                getSectionContent
            );
        } else {
            contents.forEach((content) => {
                if (content.includes('.mdx')) {
                    const objArray = getRecordObject(
                        content,
                        folderPath,
                        basePath,
                        contentAlias,
                        getSectionContent,
                        content.includes('faq.mdx')
                    );
                    objArray.map((obj) => pushRecursively(obj, records));
                }
            });
        }
    });
};
