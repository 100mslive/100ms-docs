const fs = require('fs');
const path = require('path');
const url = require('url');
const algoliasearch = require('algoliasearch/lite');

const {
    cacheContentAlias,
    getRecordObject,
    pushRecursively,
    createRecords,
    getSectionContent
} = require('./algoliaUtils');

async function updateIndex() {
    const appId = '5UAX3T19GE';
    const adminKey = 'eed09e4a3d303e35daed718838184efd';
    const algoliaIndex = 'main';
    const projectENV = 'prod';

    if (appId && adminKey && algoliaIndex && projectENV === 'prod') {
        const jsonDirectory = path.join(process.cwd());
        const contentPath = `${jsonDirectory}/common`;
        const docsPath = `${jsonDirectory}/docs`;
        const basePath = `${url.pathToFileURL(jsonDirectory).toString()}/docs`;
        const records = [];

        const contentAlias = cacheContentAlias(contentPath);
        createRecords(
            [docsPath],
            records,
            basePath,
            getRecordObject,
            contentAlias,
            pushRecursively,
            getSectionContent
        );
        console.log('Records created');
        fs.writeFileSync('records.json', JSON.stringify(records), { encoding: 'utf8', flag: 'w' });
        // const client = algoliasearch(appId, adminKey);
        // const index = client.initIndex(algoliaIndex);
        // await index.replaceAllObjects(records);
        // console.log('Records updated in Algolia');
        return true;
    }
    return false;
}

module.exports = { updateIndex };
