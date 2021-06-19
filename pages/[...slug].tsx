/* eslint-disable global-require */
import React from 'react';
import { DOCS_PATH, getAllDocs, getDocsPaths } from '@/lib/mdxUtils';
import renderToString from 'next-mdx-remote/render-to-string';
import setValue from 'set-value';
import path from 'path';
import matter from 'gray-matter';
import fs from 'fs';
import mdxPrism from 'mdx-prism';
import hydrate from 'next-mdx-remote/hydrate';
import components from '@/components/MDXComponents';
import withTableofContents from '@/lib/withTableofContents';
import { useRouter } from 'next/router';
import DocLayout from '@/layouts/DocLayout';
import getPagination from '@/lib/getPagination';

const DocSlugs = ({ toc, source, allDocs, nav, frontMatter }) => {
    const {
        query: { slug }
    } = useRouter();
    const [currentDocSlug] = slug as string[];
    const currentDocs = allDocs.filter((doc) => doc.url.includes(`/${currentDocSlug}/`));
    const { previousPost, nextPost } = getPagination(currentDocs, slug as string[]);
    const pagination = { previousPost, nextPost };
    const content = hydrate(source, { components });
    return (
        <DocLayout
            frontMatter={frontMatter}
            nav={nav[currentDocSlug]}
            toc={toc}
            pagination={pagination}
            allDocs={allDocs}
            currentDocSlug={currentDocSlug}>
            {content}
        </DocLayout>
    );
};

export default DocSlugs;

export const getStaticProps = async ({ params }) => {
    // Absolute path of the docs file
    const postFilePath = path.join(DOCS_PATH, `${path.join(...params.slug)}.mdx`);

    // Raw Mdx File Data Buffer
    const source = fs.readFileSync(postFilePath);

    /**
     * Content: Mdx Data
     * data: FrontMatter Data
     */
    const { content, data } = matter(source);

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

    const toc = [];
    const mdxSource = await renderToString(content, {
        components,
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [
                require('remark-slug'),
                require('@/lib/remark-code-header'),
                require('@fec/remark-a11y-emoji'),
                withTableofContents(toc)
            ],
            rehypePlugins: [mdxPrism]
        },
        scope: data
    });

    return {
        props: {
            toc,
            nav,
            source: mdxSource,
            frontMatter: data,
            allDocs
        }
    };
};

export const getStaticPaths = async () => {
    // Map the path into the static paths object required by Next.js
    // Would Contains all slugs for files inside Docs
    const paths = (await getDocsPaths()).map((slug) => ({
        params: {
            slug: slug.split(path.sep).filter(Boolean)
        }
    }));

    return {
        paths,
        fallback: false
    };
};
