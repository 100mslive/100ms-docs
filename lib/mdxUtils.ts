import { existsSync, readdirSync, readFileSync } from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import { mdxjs } from 'micromark-extension-mdxjs';
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

// function seperateDots(dotSeperatedNumber) {
//     return dotSeperatedNumber.split('.').map((numStr) => Number.parseInt(numStr));
// }

// function dotSeperatedNumberCompare(a, b) {
//     const aNumbers = seperateDots(a),
//         bNumbers = seperateDots(b);

//     for (let i = 0; i < Math.min(aNumbers.length, bNumbers.length); i++) {
//         if (aNumbers[i] !== bNumbers[i]) {
//             return aNumbers[i] > bNumbers[i] ? 1 : -1;
//         }
//     }

//     if (aNumbers.length === bNumbers.length) {
//         return 0;
//     } else {
//         return aNumbers.length > bNumbers.length ? 1 : -1;
//     }
// }

/**
 * Gets a list of all docs and their meta in the `DOCS_PATH` directory
 */
export const getAllDocs = () => {
    const docs = getDocsPaths()
        .map((path) => {
            // Get frontMatter from markdown
            let filePath = join(DOCS_PATH, `${path}.mdx`);
            if (!existsSync(filePath)) {
                filePath = join(DOCS_PATH, `${path}.md`);
            }
            const source = readFileSync(filePath);
            const { data, content } = matter(source);
            // Normalize paths for web
            const url = path.replace(/\\/g, '/');

            // Get URL pathname
            const pathname = url.split('/').pop();

            return {
                url,
                title: data.title || pathname!.replace(/-/g, ' '),
                description: data.description || '',
                nav: data.nav ?? '',
                content
            };
        })
        .sort((a, b) => Number(a.nav) - Number(b.nav));
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

export const slugify = (text) =>
    text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');

export const toMdxJsxFlowElement = (input) => {
    const tree = fromMarkdown(input, {
        extensions: [mdxjs()],
        mdastExtensions: [mdxFromMarkdown()]
    });
    return tree.children[0];
};
