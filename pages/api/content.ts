import { getAllDocs, getNavfromDocs } from '@/lib/mdxUtils';
import Cors from 'cors';
import { readdirSync } from 'fs';

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
    // @ts-ignore
    const sdks = readdirSync(`${process.cwd()}/docs`, { withFileTypes: true });
    const { query, section, noCache } = req.query;
    const metaData = { lastQueryTime: new Date().toUTCString(), cache: 'MISS' };
    const data = getData({ filter: query, section });
    if (Object.values(data).length && noCache !== 'true') {
        metaData.cache = 'HIT';
        res.setHeader('Cache-Control', 's-maxage=669600'); // 31 days limit by vercel
    }
    res.status(200).json({ metaData, ...data });
}

const getData = ({ filter, section }) => {
    if (filter) {
        const docs = getAllDocs() as unknown;
        const nav = getNavfromDocs(docs);
        if (filter === '*') return { nav, docs };
        if (filter === 'docs') return { docs };
        if (filter === 'nav') {
            let filteredNav = nav;
            if (section) filteredNav = { [section]: nav[section] };
            return { nav: filteredNav };
        }
    }
    return {};
};
