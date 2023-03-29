const fs = require('fs');
const path = require('path');
const url = require('url');

const { getPlatform, getHeadings } = require('../algolia/helper');

exports.iterateOverFiles = function iterateOverFiles(
    folderPaths,
    basePath,
    data,
    getLatestVersion
) {
    folderPaths.map((folderPath) => {
        const contents = fs.readdirSync(folderPath);
        const subFolders = contents.filter((content) =>
            fs.lstatSync(path.resolve(folderPath, content)).isDirectory()
        );
        const subFolderPaths = subFolders.map((subFolder) => path.resolve(folderPath, subFolder));

        if (subFolderPaths.length)
            iterateOverFiles(subFolderPaths, basePath, data, getLatestVersion);

        contents.forEach((content) => {
            if (content.includes('release-notes')) {
                const objArray = getLatestVersion(content, folderPath, basePath);
                data.push(objArray);
            }
        });
    });
};

exports.formatDate = function formatDate(string) {
    return new Date(string).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    });
};

exports.getLatestVersion = function getLatestVersion(content, folderPath, basePath) {
    let link = url.pathToFileURL(path.resolve(folderPath, content)).toString().split(basePath)[1];
    const fileContent = fs.readFileSync(path.resolve(folderPath, content)).toString();
    const platform = getPlatform(link);
    const headers = getHeadings(fileContent);
    return {
        platform: platform === 'JavaScript' ? 'Web' : platform,
        version:
            platform === 'JavaScript'
                ? headers[1]
                : platform === 'Server-side'
                ? headers[0]
                : headers[0].split('-')[0].split(' ')[0],
        date:
            platform === 'JavaScript'
                ? headers[1]
                : platform === 'Server-side'
                ? headers[0]
                : headers[0].split(' - ')[1]
    };
};
