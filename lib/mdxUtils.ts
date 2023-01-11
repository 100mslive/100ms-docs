import { readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import setValue from 'set-value';

/**
 * Checks for the MDX file extension
 */
export const MARKDOWN_REGEX = /\.mdx?$/;

/**
 * Useful when you want to get the path to a specific file
 */
export const DOCS_PATH = join(process.cwd(), 'docs');

/**
 * Gets a list of all mdx files inside the `DOCS_PATH` directory
 */

const getFileList = (dirName) => {
    let files: string[] = [];
    const items = readdirSync(dirName, { withFileTypes: true });

    for (const item of items) {
        if (item.isDirectory()) {
            files = [...files, ...getFileList(`${dirName}/${item.name}`)];
        } else {
            const fullPath = `${dirName}/${item.name}`;
            files.push(fullPath.replace(DOCS_PATH, ''));
        }
    }
    return files;
};

export const getDocsPaths = () => {
    const files = getFileList(DOCS_PATH);
    return files
        .filter((path) => MARKDOWN_REGEX.test(path))
        .map((path) => path.replace(MARKDOWN_REGEX, ''));
};

/**
 * Gets a list of all docs and their meta in the `DOCS_PATH` directory
 */
export const getAllDocs = () => {
    const docs = getDocsPaths()
        .map((path) => {
            // Get frontMatter from markdown
            const source = readFileSync(join(DOCS_PATH, `${path}.mdx`));
            const { data, content } = matter(source);
            // Normalize paths for web
            const url = path.replace(/\\/g, '/');

            // Get URL pathname
            const pathname = url.split('/').pop();

            return {
                url,
                title: data.title || pathname!.replace(/-/g, ' '),
                description: data.description || '',
                nav: data.nav ?? Infinity,
                content
            };
        })
        .sort((a, b) => (a.nav > b.nav ? 1 : -1));
    return docs;
};

export const getNavfromDocs = (docs) => {
    const filteredDocs = docs.map((article) => {
        const articleClone = { ...article };
        delete articleClone.content;
        return articleClone;
    });
    return filteredDocs.reduce((n, file) => {
        const [lib, ...rest] = file.url.split('/').filter(Boolean);
        const pathV = `${lib}${rest.length === 1 ? '..' : '.'}${rest.join('.')}`;
        // Set nested properties on an object using dot-notation.
        // set(obj, 'a.b.c', 'd');
        // => { a: { b: { c: 'd' } } }
        setValue(n, pathV, file);
        return n;
    }, {});
};

export const slugify = (text) => text.toString().toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");

/*
Source: https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
    
    (/\s+/g, '-') //spaces to dashes
    (/&/g, '-and-') //ampersand to and
    (/[^\w\-]+/g, '') //remove non-words
    (/\-\-+/g, '-') //collapse multiple dashes
    (/^-+/, '') //trim starting dash
    (/-+$/, ''); //trim ending dash
    
*/