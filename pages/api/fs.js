import { readdirSync } from 'fs';
import path from 'path';

export default async function handler(_req, res) {
    // Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd());
    console.log(jsonDirectory);
    const files = readdirSync(`${jsonDirectory}/docs`, { withFileTypes: true });
    // Read the json data file data.jso
    // Return the content of the data file in json format
    res.status(200).json({ files });
}
