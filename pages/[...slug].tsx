import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import fs from 'fs';
import path from 'path';
import mdxPrism from 'mdx-prism';
import EditFile from '@/components/EditFile';
import components from '@/components/MDXComponents';
import Pagination from '@/components/Pagination';
import Sidebar from '@/components/Sidebar';
import Toc from '@/components/Toc';
import Header from '@/components/Header';
import SegmentAnalytics from '@/components/SegmentAnalytics';
import imagePlugin from '@/lib/image';
import getPagination from '@/lib/getPagination';
import { DOCS_PATH, getAllDocs, getDocsPaths, getNavfromDocs } from '@/lib/mdxUtils';
import withTableofContents from '@/lib/withTableofContents';
import { scrollToUrlHash } from '@/lib/scrollToUrlHash';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
import { bundleMDX } from 'mdx-bundler';
import { getMDXComponent } from 'mdx-bundler/client';
import remarkCodeHeader from '@/lib/remark-code-header';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import remarkA11yEmoji from '@fec/remark-a11y-emoji';

type NavRoute = {
    url: string;
    title: string;
};

export type AllDocsType = {
    url: string;
    title: string;
    description: string;
    nav: number;
    content: string;
};

export interface PaginationType {
    url: string;
    title: string;
    description: string;
    nav: number;
    content: unknown;
}
interface Props {
    frontMatter: {
        title: string;
        nav: number;
    };
    nav: Record<string, Record<string, NavRoute>>;

    pagination: {
        previousPost: PaginationType;
        nextPost: PaginationType;
    };
    source: string;
}

const DocSlugs = ({ source, frontMatter, pagination, nav }: Props) => {
    const {
        query: { slug },
        asPath
    } = useRouter();
    const [currentDocSlug] = slug as string[];
    const [activeHeading, setActiveHeading] = React.useState('');
    const [activeSubHeading, setActiveSubHeading] = React.useState('');
    const Component = useMemo(() => getMDXComponent(source), [source]);

    React.useEffect(() => {
        setTimeout(() => {
            scrollToUrlHash(asPath);
        }, 500);
    }, [asPath]);

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
    if (slug![1] === 'android') {
        showPagination = false;
    }
    const [modal, setModal] = React.useState(false);
    const [menu, setMenu] = React.useState(false);
    const menuState = { menu, setMenu };
    useLockBodyScroll(modal);

    const router = useRouter();
    const SEO = {
        title: `${frontMatter.title || '100ms Docs'} | 100ms`,
        openGraph: {
            title: `${frontMatter.title || '100ms Docs'} | 100ms`
        },
        canonical: `${process.env.NEXT_PUBLIC_CANONICAL_BASE_URL}${
            router.asPath === '/' ? '' : router.asPath.split('?')[0]
        }`
    };

    return (
        <div style={{ margin: '0' }}>
            <NextSeo {...SEO} />
            <SegmentAnalytics options={{}} title={frontMatter.title} />
            <Header modal={modal} setModal={setModal} menuState={menuState} />
            <div
                style={{
                    display: 'flex',
                    paddingTop: '1rem',
                    justifyContent: 'center',
                    width: '100%'
                }}>
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        maxWidth: '1500px',
                        justifyContent: 'space-between'
                    }}>
                    <div>
                        <Sidebar menuState={menuState} nav={nav} />
                    </div>
                    {!menu ? (
                        <article
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                minWidth: '100px',
                                flexGrow: '1',
                                boxSizing: 'border-box',
                                padding: '0 2rem',
                                minHeight: 'calc(100vh - 140px)',
                                paddingBottom: '80px'
                            }}>
                            <h1>{frontMatter.title}</h1>
                            <Component components={components} />
                            <hr />
                            {pagination.previousPost && showPagination && (
                                <Pagination
                                    next={pagination.nextPost}
                                    prev={pagination.previousPost}
                                />
                            )}
                            <EditFile slug={asPath} />
                        </article>
                    ) : null}
                    <Toc
                        activeHeading={activeHeading}
                        activeSubHeading={activeSubHeading}
                        CurrentDocsSlug={currentDocSlug}
                    />
                </div>
            </div>
        </div>
    );
};

export default DocSlugs;

export const getStaticProps = async ({ params }) => {
    // Absolute path of the docs file
    const postFilePath = path.join(DOCS_PATH, `${path.join(...params.slug)}.mdx`);
    // Raw Mdx File Data Buffer
    const source = fs.readFileSync(postFilePath, 'utf-8');

    const allDocs = getAllDocs();
    const nav = getNavfromDocs(allDocs);
    const [currentDocSlug] = params.slug as string[];
    const currentDocs = allDocs.filter((doc) => doc.url.includes(`/${currentDocSlug}/`));
    const { previousPost, nextPost } = getPagination(currentDocs, params.slug as string[]);
    const pagination = { previousPost, nextPost };
    const { code, frontmatter } = await bundleMDX({
        cwd: path.join(DOCS_PATH, path.join(...params.slug.slice(0, -1))),
        source,
        mdxOptions(options) {
            options.remarkPlugins = [
                ...(options.remarkPlugins ?? []),
                remarkGfm,
                remarkA11yEmoji,
                imagePlugin,
                remarkCodeHeader,
                withTableofContents
            ];
            options.rehypePlugins = [
                ...(options.rehypePlugins ?? []),
                [
                    rehypeRaw,
                    {
                        passThrough: [
                            'mdxFlowExpression',
                            'mdxJsxFlowElement',
                            'mdxJsxTextElement',
                            'mdxTextExpression',
                            'mdxjsEsm'
                        ]
                    }
                ],
                mdxPrism
            ];
            return options;
        }
    });

    return {
        props: {
            pagination,
            nav: { [currentDocSlug]: nav[currentDocSlug] },
            source: code, // { compiledSource: mdxSource.compiledSource },
            frontMatter: frontmatter
        }
    };
};

export const getStaticPaths = async () => {
    // Map the path into the static paths object required by Next.js
    // Would Contains all slugs for files inside Docs
    const paths = getDocsPaths().map((slug) => ({
        params: {
            slug: slug.split(path.sep).filter(Boolean)
        }
    }));

    return {
        paths,
        fallback: false
    };
};
