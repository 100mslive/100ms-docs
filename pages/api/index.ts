import { readdirSync } from 'fs';
import path from 'path';

export default async function handler(req, res) {
    // Find the absolute path of the json directory
    const jsonDirectory = path.join(process.cwd());
    const first = readdirSync(jsonDirectory, { withFileTypes: true });
    const second = readdirSync(`${jsonDirectory}/docs`, { withFileTypes: true });
    // Read the json data file data.jso
    // Return the content of the data file in json format
    res.status(200).json({ first, second });
}
