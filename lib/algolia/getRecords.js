const fs = require('fs');
const path = require('path');
const url = require('url');

const updateIndex = (contentPath, docsPath) => {
    const records = [];
    const contentAlias = {};
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
        '> Note :'
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

    const toCamelCase = (fileName) => {
        const formattedName = fileName
            .split('-')
            .map((word) => word[0].toUpperCase() + word.slice(1))
            .join('');
        return formattedName[0].toLowerCase() + formattedName.slice(1);
    };

    const getCleanedContent = (content) => {
        let mainContent = content.split('\n').slice(3).join(' ');
        //Removes code blocks, might show up in search result snippets otherwise
        mainContent = mainContent.replace(/```.*?```/g, '');
        Object.keys(contentAlias).map(
            (contentTag) =>
                (mainContent = mainContent.replace(contentTag, contentAlias[contentTag]))
        );
        specialChars.map((specialChar) => (mainContent = mainContent.split(specialChar).join(' ')));
        return mainContent.toString();
    };

    const getHeadings = (content) => {
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
        const link = url
            .pathToFileURL(path.resolve(folderPath, filename))
            .toString()
            .split('/docs')[1]
            .slice(0, -4);
        const fileContent = fs.readFileSync(path.resolve(folderPath, filename)).toString();

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

    const createRecords = (folderPaths, contentAlias) => {
        folderPaths.map((folderPath) => {
            const contents = fs.readdirSync(folderPath);
            const subFolders = contents.filter((content) =>
                fs.lstatSync(path.resolve(folderPath, content)).isDirectory()
            );
            const subFolderPaths = subFolders.map((subFolder) =>
                path.resolve(folderPath, subFolder)
            );

            if (subFolderPaths.length) {
                createRecords(subFolderPaths, contentAlias);
            } else {
                contents.forEach((content) => {
                    if (content.includes('.mdx')) {
                        const obj = getRecordObject(content, folderPath, contentAlias);
                        pushRecursively(obj);
                    }
                });
            }
        });
    };

    const cacheContentAlias = (basePath) => {
        const contentAlias = {};
        const contents = fs.readdirSync(basePath);
        contents.forEach((content) => {
            contentAlias[`<Content alias="${toCamelCase(content.toString().slice(0, -3))}" />`] =
                fs.readFileSync(path.resolve(basePath, content));
        });
        return contentAlias;
    };
    cacheContentAlias(contentPath);
    createRecords([docsPath]);
    return records;
};

export default updateIndex;