import setValue from 'set-value';
import { getAllDocs } from '../../lib/mdxUtils';

export default async function handler(req, res) {
    res.setHeader('Cache-Control', 's-maxage=669600'); // 31 days limit by vercel
    // const params = { slug: ['javascript', 'v2', 'guides', 'javascript-quickstart'] };
    // Absolute path of the docs file
    // const postFilePath = path.join(DOCS_PATH, `${path.join(...params.slug)}.mdx`);

    // Raw Mdx File Data Buffer
    // const source = fs.readFileSync(postFilePath);

    /**
     * Content: Mdx Data
     * data: FrontMatter Data
     */
    // const { content, data } = matter(source);
    const allDocs = await getAllDocs();

    const nav = allDocs.reduce((n, file) => {
        const [lib, ...rest] = file.url.split('/').filter(Boolean);
        const pathV = `${lib}${rest.length === 1 ? '..' : '.'}${rest.join('.')}`;
        // Set nested properties on an object using dot-notation.
        // set(obj, 'a.b.c', 'd');
        // => { a: { b: { c: 'd' } } }
        setValue(n, pathV, file);
        return n;
    }, {});

    // const toc = [];
    // const mdxSource = await renderToString(content, {
    //     components,
    //     // Optionally pass remark/rehype plugins
    //     mdxOptions: {
    //         remarkPlugins: [
    //             require('@/lib/remark-code-header'),
    //             require('@fec/remark-a11y-emoji'),
    //             withTableofContents(toc),
    //             imagePlugin
    //         ],
    //         rehypePlugins: [mdxPrism]
    //     },
    //     scope: data
    // });
    res.status(200).json({
        nav,
        allDocs
    });
}
