const fs = require('fs');
const path = require('path');
const url = require('url');
const algoliasearch = require('algoliasearch/lite');
const {
    cacheContentAlias,
    toCamelCase,
    getCleanedContent,
    getHeadings,
    getKeywords,
    getTitle,
    getPlatform,
    getRecordObject,
    pushRecursively,
    createRecords
} = require('./algoliaUtils');

async function updateIndex() {
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
    const adminKey = process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY;
    const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
    const projectENV = process.env.NEXT_PUBLIC_APP_ENV;

    if (appId && adminKey && algoliaIndex && projectENV === 'prod') {
        const jsonDirectory = path.join(process.cwd());
        const contentPath = `${jsonDirectory}/common`;
        const docsPath = `${jsonDirectory}/docs`;
        const basePath = `${url.pathToFileURL(jsonDirectory).toString()}/docs`;
        const records = [];

        const contentAlias = cacheContentAlias(contentPath);
        createRecords([docsPath], records, basePath);
        console.log('records created locally');
        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(algoliaIndex);
        await index.replaceAllObjects(records);
        console.log('records updated in algolia');
        return true;
    }
    return false;
}

module.exports = { updateIndex };
