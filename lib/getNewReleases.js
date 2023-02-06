const path = require('path');
const url = require('url');
const { iterateOverFiles, getLatestVersion } = require('./home/helper');
const { releases } = require('../releases');

function getNewReleases() {
    const jsonDirectory = path.join(process.cwd());
    const docsPath = `${jsonDirectory}/docs`;
    const basePath = `${url.pathToFileURL(jsonDirectory).toString()}/docs`;
    const data = [];

    iterateOverFiles([docsPath], basePath, data, getLatestVersion);
    console.log(data);
    console.log(releases);
    // data.map(release => )
}

module.exports = { getNewReleases };
