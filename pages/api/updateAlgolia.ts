import Cors from 'cors';
import path from 'path';
import fs from 'fs';
import url from 'url'
import algoliasearch from 'algoliasearch/lite';
import updateIndex from '@/lib/algolia/getRecords'
import { DOCS_PATH } from '@/lib/mdxUtils';

const cors = Cors({
    methods: ['GET', 'HEAD']
});

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

export default async function handler(req, res) {
    await runMiddleware(req, res, cors);
    const jsonDirectory = path.join(process.cwd());
    // @ts-ignore
    const dummyVar = fs.readdirSync(`${jsonDirectory}/common`)
    // @ts-ignore
    const dummyLink = url.pathToFileURL(path.resolve(`${jsonDirectory}/common`))
    const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID
    const adminKey = process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY
    const algoliaIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX
    if(appId && adminKey && algoliaIndex){
        const records = updateIndex(`${jsonDirectory}/common`, `${jsonDirectory}/docs`);
        // console.log(records[0]);
        const client = algoliasearch(appId, adminKey);
        const index = client.initIndex(algoliaIndex);
        // @ts-ignore
        await index.replaceAllObjects(records);
        res.status(200).json({ status: "completed" })
    }else {
        res.status(200).json({ status: "failed" })
    }
}