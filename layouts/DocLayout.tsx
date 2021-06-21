import Header from '@/components/Header';
import Pagination from '@/components/Pagination';
import SearchModal from '@/components/SearchModal';
import Sidebar from '@/components/Sidebar';
import Toc, { TocItem } from '@/components/Toc';
import { PaginationType } from '@/lib/getPagination';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
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
    const [modal, setModal] = React.useState(false);
    const menuState = { menu, setMenu };
    const modalState = { modal, setModal };
    useLockBodyScroll(modal);
    return (
        <>
            {modal ? <SearchModal docs={allDocs} currentDocSlug={currentDocSlug} /> : null}
            <div className="page">
                <NextSeo {...SEO} />
                <Header modalState={modalState} menuState={menuState} />
                <div className="ctx">
                    <Sidebar menu={menu} nav={nav} />
                    <div className="content-wrapper">
                        <article>
                            <h1>{frontMatter.title}</h1>
                            {children}
                            <hr />
                            {pagination.previousPost && (
                                <Pagination
                                    next={pagination.nextPost}
                                    prev={pagination.previousPost}
                                />
                            )}
                        </article>
                        {toc.length > 0 ? <Toc toc={toc} /> : null}
                    </div>
                </div>
                <style jsx>{`
                    .page {
                        max-width: 1600px;
                        margin: 0 auto;
                        position: relative;
                        opacity: ${modal ? 0.3 : 1};
                        height: ${modal ? '100vh !important' : ''};
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
        </>
    );
};

export default DocLayout;
