const path = require('path');
const url = require('url');
const { iterateOverFiles, getLatestVersion } = require('./home/helper');
const { releases } = require('../releases');

function getNewReleases() {
    const jsonDirectory = path.join(process.cwd());
    const docsPath = `${jsonDirectory}/docs`;
    const basePath = `${url.pathToFileURL(jsonDirectory).toString()}/docs`;
    const data = [];
    const latestVersion = {};

    iterateOverFiles([docsPath], basePath, data, getLatestVersion);
    data.forEach((item) => (latestVersion[item.platform] = item.version));

    data.forEach((item) => {
        releases[item.platform] =
            item.version === releases[item.platform].version
                ? { version: item.version, date: releases[item.platform].date }
                : { version: item.version, date: item.date };
    });
    console.log(releases);
}

module.exports = { getNewReleases };
