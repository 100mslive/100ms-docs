import path from 'path';
import fs from 'fs';
import url from 'url';
import updateIndex from '@/lib/algolia/getRecords';

export default async function handler(_req, res) {
    const jsonDirectory = path.join(process.cwd());
    // @ts-ignore
    const dummyVar = fs.readdirSync(`${jsonDirectory}/common`);
    // @ts-ignore
    const dummyLink = url.pathToFileURL(path.resolve(`${jsonDirectory}/common`));
    const completedUpdate = await updateIndex();
    res.status(200).json({ status: completedUpdate });     
}
