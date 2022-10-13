import { getAllDocs, getNavfromDocs } from '../../lib/mdxUtils';

// export const config = {
//     runtime: 'experimental-edge'
// };

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=669600'); // 31 days limit by vercel
    const { filter } = req.query;
    let allDocs = getAllDocs();
    let nav;
    if (!filter || filter === 'nav') nav = getNavfromDocs(allDocs);
    if (filter !== 'docs' && filter) allDocs = undefined;
    res.status(200).json({
        nav,
        allDocs,
        lastCachedTime: new Date().toTimeString()
    });
}
