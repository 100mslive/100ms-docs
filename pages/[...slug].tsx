import EditFile from '@/components/EditFile';
import components from '@/components/MDXComponents';
import Pagination from '@/components/Pagination';
import Toc from '@/components/Toc';
import DocLayout from '@/layouts/DocLayout';
import getPagination from '@/lib/getPagination';
import imagePlugin from '@/lib/image';
import { DOCS_PATH, getAllDocs, getDocsPaths } from '@/lib/mdxUtils';
import { scrollToUrlHash } from '@/lib/scrollToUrlHash';
import withTableofContents from '@/lib/withTableofContents';
import fs from 'fs';
import matter from 'gray-matter';
import mdxPrism from 'mdx-prism';
import hydrate from 'next-mdx-remote/hydrate';
import renderToString from 'next-mdx-remote/render-to-string';
import { useRouter } from 'next/router';
import path from 'path';
import React from 'react';
import setValue from 'set-value';



const DocSlugs = ({ source, allDocs, frontMatter }) => {
    const {
        query: { slug }
    } = useRouter();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const router = useRouter() as any;
    const [currentDocSlug] = slug as string[];
    const [activeHeading, setActiveHeading] = React.useState('');
    const [activeSubHeading, setActiveSubHeading] = React.useState('');
    const currentDocs = allDocs.filter((doc) => doc.url.includes(`/${currentDocSlug}/`));
    const { previousPost, nextPost } = getPagination(currentDocs, slug as string[]);
    const pagination = { previousPost, nextPost };
    const content = hydrate(source, { components });


    React.useEffect(() => {
        setTimeout(() => {
            scrollToUrlHash(router.asPath);
        }, 500);
    }, [router.asPath]);
    React.useEffect(() => {
        if (!window.location.href.includes('#')) window.scrollTo(0, 0);
        const getTopIndex = (arr) => {
            for (let i = arr.length - 1; i >= 0; i--)
                if (Math.floor(arr[i].getBoundingClientRect().top) < 200) return i;
            return -1;
        };
        const getActiveLinks = () => {
            const h2Array = document.getElementsByTagName('h2');
            const h3Array = document.getElementsByTagName('h3');

            const h2Index = getTopIndex(h2Array);
            const h3Index = getTopIndex(h3Array);

            if (h2Index >= 0) {
                setActiveHeading(h2Array[h2Index].id);
                if (
                    h3Index >= 0 &&
                    h3Array[h3Index].getBoundingClientRect().top >
                    h2Array[h2Index].getBoundingClientRect().top
                )
                    setActiveSubHeading(h3Array[h3Index].id);
                else setActiveSubHeading('');
            }
        };
        getActiveLinks();
        window.addEventListener('scroll', getActiveLinks);

        return () => window.removeEventListener('scroll', getActiveLinks);
    }, []);
    let showPagination = true;
    // Don't show Pagination for Android
    if (router.query.slug[1] === 'android') {
        showPagination = false;
    }
    return (
        <>
            <article>
                <h1>{frontMatter.title}</h1>
                {content}
                <hr />
                {pagination.previousPost && showPagination && (
                    <Pagination
                        next={pagination.nextPost}
                        prev={pagination.previousPost}
                    />
                )}
                <EditFile slug={router.asPath} />
            </article>
            <Toc activeHeading={activeHeading} activeSubHeading={activeSubHeading} />
            <style jsx>{`
                 html {
                     height: 100%;
                     scroll-behavior: smooth !important;
                 }
                 .wrapper-ctx {
                     display: flex;
                 }
                 article {
                     max-width: 1200px;
                     width: calc(100vw - 630px);
                     flex-grow: 1;
                     box-sizing: border-box;
                     padding: 0 2rem;
                     min-height: calc(100vh - 140px);
                     padding-bottom: 80px;
                     display: flex;
                     flex-direction: column;
                     align-items: stretch;
                 }
                 .mobile-menu {
                     display: none;
                     position: absolute;
                 }
             `}</style>

        </>
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
    const sdks = Object.keys(nav)
    const sdk = nav[params.slug[0]]
    sdks.forEach(item => { nav[item] = { v2: null } })
    nav[params.slug[0]] = sdk
    rec(nav);
    // console.log(nav)
    const toc = [];
    const mdxSource = await renderToString(content, {
        components,
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [
                require('@/lib/remark-code-header'),
                require('@fec/remark-a11y-emoji'),
                withTableofContents(toc),
                imagePlugin
            ],
            rehypePlugins: [mdxPrism]
        },
        scope: data
    });
    const file = `/${params.slug.join('/')}`
    return {
        props: {
            toc,
            nav,
            source, // : { compiledSource: mdxSource.compiledSource },
            frontMatter: data,
            allDocs: allDocs.filter(doc => doc.url.includes(file))
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

DocSlugs.getLayout = function getLayout(page) {
    return (
        <DocLayout>
            {page}
        </DocLayout>
    )
}

const rec = (item) => {
    if (typeof item == typeof {}) {
        for (const i in item) {
            console.log(i, item);
            if (i === "content" && typeof item[i] !== typeof {}) item[i] = null;
            else {
                rec(item[i]);
            }
            console.log(i, item);
        }
    }
};

