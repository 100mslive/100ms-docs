const path = require('path');
const fs = require('fs');
const url = require('url');
const { iterateOverFiles, getLatestVersion } = require('./home/helper');
const { releases } = require('../releases');

function getNewReleases() {
    const jsonDirectory = path.join(process.cwd());
    const docsPath = `${jsonDirectory}/docs`;
    const basePath = `${url.pathToFileURL(jsonDirectory).toString()}/docs`;
    const data = [];

    iterateOverFiles([docsPath], basePath, data, getLatestVersion);

    try {
        data.forEach((item) => {
            releases[item.platform] =
                item.version === releases[item.platform].version
                    ? { version: item.version, date: releases[item.platform].date }
                    : { version: item.version, date: item.date };
        });
    } catch (e) {
        console.log('Error in updating object', e);
    }

    try {
        fs.writeFileSync(
            'releases.js',
            `exports.releases = releases = ${JSON.stringify(releases)}`,
            'utf-8'
        );
    } catch (e) {
        console.log('Error in logging data', e);
    }
}

module.exports = { getNewReleases };
