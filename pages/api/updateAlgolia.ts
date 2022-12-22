import Cors from 'cors';
import path from 'path';
import fs from 'fs';
import url from 'url'
import algoliasearch from 'algoliasearch/lite';
import updateIndex from '../../algolia/getRecords'

const cors = Cors({
    methods: ['GET', "HEAD"]
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
    const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "", process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY|| "");

    const index = client.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX|| "");

    const records = await updateIndex(`${jsonDirectory}/common`, `${jsonDirectory}/docs`);
    // @ts-ignore
    index.replaceAllObjects(records).then(() => res.status(200).json({ status: "completed" }))   
}