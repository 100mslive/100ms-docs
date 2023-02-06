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

exports.getLatestVersion = function getLatestVersion(content, folderPath, basePath) {
    let link = url.pathToFileURL(path.resolve(folderPath, content)).toString().split(basePath)[1];
    const fileContent = fs.readFileSync(path.resolve(folderPath, content)).toString();
    const platform = getPlatform(link);
    const headers = getHeadings(fileContent);
    return { platform, version: headers[0] };
};
