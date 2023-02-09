const path = require('path');
const fs = require('fs');
const url = require('url');
const { iterateOverFiles, getLatestVersion, formatDate } = require('./home/helper');
const { releases } = require('../releases');

function getNewReleases() {
    const jsonDirectory = path.join(process.cwd());
    const docsPath = `${jsonDirectory}/docs`;
    const basePath = `${url.pathToFileURL(jsonDirectory).toString()}/docs`;
    const data = [];

    iterateOverFiles([docsPath], basePath, data, getLatestVersion);

    try {
        data.forEach(
            (item) =>
                (releases[item.platform] = { version: item.version, date: formatDate(item.date) })
        );
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
