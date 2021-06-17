import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
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

            <Sidebar nav={nav} />
            <article className="content">
                <Search currentDocSlug={currentDocSlug} docs={allDocs} />
                {children}
                <hr />
                {pagination.previousPost && (
                    <Pagination next={pagination.nextPost} prev={pagination.previousPost} />
                )}
            </article>
            <Toc toc={toc} />
            <style jsx>{`
                .page {
                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    height: initial;
                    display: flex;
                }
                .content {
                    padding-top: 30px;
                    padding-left: 80px;
                    max-width: 750px;
                    overflow: scroll;
                    overflow-y: hidden;
                    overflow-x: hidden;
                }
                @media screen and (max-width: 1000px) {
                    .page {
                        flex-direction: column;
                    }
                    .content {
                        padding-right: 20px;
                        padding-left: 20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default DocLayout;
