import { getAllDocs, getNavfromDocs } from '@/lib/mdxUtils';
import Cors from "cors";
// import fs from 'fs';

const cors = Cors({
    methods: ["GET", "HEAD"],
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
    res.setHeader('Cache-Control', 's-maxage=669600'); // 31 days limit by vercel
    const { filter } = req.query;
    let allDocs = getAllDocs() as unknown;
    let nav;
    if (!filter || filter === 'nav') nav = getNavfromDocs(allDocs);
    if (filter !== 'docs' && filter) allDocs = undefined;
    res.status(200).json({
        nav,
        allDocs,
        lastCachedTime: new Date().toUTCString()
    });
}