import { getAllDocs, getNavfromDocs } from '@/lib/mdxUtils';
import Cors from 'cors';

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
    const { query, section } = req.query;
    console.log(req.query);
    const metaData = { lastQueryTime: new Date().toUTCString(), cache: 'MISS' };
    const data = getData({ filter: query, section });
    if (Object.values(data).length) {
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
