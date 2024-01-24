const fs = require('fs');
const path = require('path');
const url = require('url');
const {
    toPascalCase,
    getKeywords,
    getPlatform,
    getTitle,
    getHeadings,
    getCleanedContent,
    getFaqLink,
    getRecordType
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
        contentAlias[`<${toPascalCase(content.toString().slice(0, -3))} />`] = fs
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
    let link = url.pathToFileURL(path.resolve(folderPath, filename)).toString().split(basePath)[1];
    link = link.slice(0, link.includes('.mdx') ? -4 : -3);

    const fileContent = fs.readFileSync(path.resolve(folderPath, filename)).toString();
    const platform = getPlatform(link);
    const headers = getHeadings(fileContent);

    const result = splitSectionLevel ? headers : [getTitle(fileContent)];
    const fileRecords = [];
    result.forEach((item, index) => {
        const fileRecord = {
            title: item,
            type: getRecordType(link),
            link: splitSectionLevel ? `${link}#${slugify(item)}` : link,
            platformName: platform,
            headings: headers,
            objectID: splitSectionLevel ? `${link}#${slugify(item)}-${index}` : link,
            keywords: splitSectionLevel ? [] : getKeywords(fileContent),
            content: splitSectionLevel
                ? getSectionContent(headers, fileContent, index, fileRecords)
                : getCleanedContent(fileContent, contentAlias)
        };
        fileRecords.push(fileRecord);
    });

    return fileRecords;
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
        pushRecursively(leftChild, records);
        pushRecursively(rightChild, records);
    }
};

exports.convertFaqs = function convertFaqs(faqs) {
    const plat = {
        'React Native': 'react-native',
        JavaScript: 'javascript',
        Flutter: 'flutter',
        Common: 'javascript'
    };

    const records =
        faqs.map((faq, index) => {
            const url = getFaqLink(plat[faq.platform], slugify(faq.questions));
            return {
                title: faq.questions || 'FAQ',
                objectID: `${url}-${index}`,
                link: url,
                platformName: faq.platform === 'Common' ? '' : faq.platform,
                type: 'FAQ',
                keywords: [],
                headings: [],
                content: faq.answers || ''
            };
        }) || [];
    return records;
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
        }
        contents.forEach((content) => {
            if (content.includes('.md')) {
                const objArray = getRecordObject(
                    content,
                    folderPath,
                    basePath,
                    contentAlias,
                    getSectionContent,
                    false
                );
                objArray.map((obj) => pushRecursively(obj, records));
            }
        });
    });
};

exports.listFilesRecursively = function listFilesRecursively(directoryPath) {
    const files = [];

    function traverseDirectory(currentPath, parents = []) {
        const entries = fs.readdirSync(currentPath);

        entries.forEach((entry) => {
            const entryPath = path.join(currentPath, entry);
            const stats = fs.statSync(entryPath);

            if (stats.isFile()) {
                // If it's a file, add it to the list with parent directory names
                const filePathWithParents = path.join(...parents, entry);
                files.push(filePathWithParents);
            } else if (stats.isDirectory()) {
                // If it's a directory, recursively traverse it with updated parents
                traverseDirectory(entryPath, [...parents, entry]);
            }
        });
    }

    traverseDirectory(directoryPath);

    return files;
};

exports.appendMdFilesContent = function appendMdFilesContent(basePath, files) {
    const outputFile = 'mergedDocs.md';

    files.forEach((file) => {
        const ourFile = basePath + '/' + file;
        if (path.extname(ourFile) === '.md' || path.extname(ourFile) === '.mdx') {
            const fileContent = fs.readFileSync(ourFile, 'utf8');
            fs.appendFileSync(outputFile, `# ${file}\n\n`); // title of the file
            fs.appendFileSync(outputFile, `${fileContent}\n\n`);
        }
    });

    console.log(`Content of MD files has been appended to ${outputFile}`);
};
