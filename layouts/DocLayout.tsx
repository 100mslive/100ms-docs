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
    return (
        <div className="page">
            <NextSeo {...SEO} />
            <Header />
            <div className="ctx">
                <Sidebar nav={nav} />
                <div className="content-ctx">
                    <div className="content-wrapper">
                        <article>
                            {children}
                            <hr />
                            {pagination.previousPost && (
                                <Pagination
                                    next={pagination.nextPost}
                                    prev={pagination.previousPost}
                                />
                            )}
                        </article>
                        <Toc toc={toc} />
                    </div>
                </div>
            </div>
            <style jsx>{`
                .ctx {
                    display: flex;
                }
                .content-ctx {
                    flex: 1 1 auto;
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
            `}</style>
        </div>
    );
};

export default DocLayout;
