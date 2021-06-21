import Header from '@/components/Header';
import Pagination from '@/components/Pagination';
import Sidebar from '@/components/Sidebar';
import Toc, { TocItem } from '@/components/Toc';
import { PaginationType } from '@/lib/getPagination';
import { NextSeo } from 'next-seo';
import React from 'react';

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

interface Props {
    frontMatter: {
        title: string;
        nav: number;
    };
    nav: Record<string, Record<string, NavRoute>>;
    toc: TocItem[];
    pagination: {
        previousPost: PaginationType;
        nextPost: PaginationType;
    };
    allDocs: AllDocsType[];
    currentDocSlug: string;
}

const DocLayout: React.FC<Props> = ({
    frontMatter,
    nav,
    children,
    toc,
    pagination,
    allDocs,
    currentDocSlug
}) => {
    const SEO = {
        title: `${frontMatter.title} | 100ms - Video conferencing infrastructure for a video-first world`,
        openGraph: {
            title: `${frontMatter.title} | 100ms - Video conferencing infrastructure for a video-first world`
        }
    };
    const [menu, setMenu] = React.useState(false);
    const menuState = { menu, setMenu };
    return (
        <div className="page">
            <NextSeo {...SEO} />
            <Header docs={allDocs} currentDocSlug={currentDocSlug} menuState={menuState} />
            <div className="ctx">
                <Sidebar menu={menu} nav={nav} />
                <div className="content-wrapper">
                    <article>
                        <h1>{frontMatter.title}</h1>
                        <hr />
                        {children}
                        <hr />
                        {pagination.previousPost && (
                            <Pagination next={pagination.nextPost} prev={pagination.previousPost} />
                        )}
                    </article>
                    {toc.length > 0 ? <Toc toc={toc} /> : null}
                </div>
            </div>
            <style jsx>{`
                .page {
                    max-width: 1600px;
                    margin: 0 auto;
                }
                .ctx {
                    position: relative;
                    display: flex;
                }
                .wrapper-ctx {
                    display: flex;
                    width: 100%;
                }
                article {
                    max-width: 760px;
                    padding: 2rem 3rem;
                }
                .content-ctx {
                    min-height: 100vh;
                }
                .content-wrapper {
                    width: 100%;
                    display: flex;
                }
                .mobile-menu {
                    display: none;
                    position: absolute;
                }
                @media screen and (max-width: 1000px) {
                    article {
                        padding: 2rem 1rem;
                        max-width: 100%;
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
};

export default DocLayout;
