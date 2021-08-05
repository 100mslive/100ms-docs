import Header from '@/components/Header';
import Pagination from '@/components/Pagination';
import Sidebar from '@/components/Sidebar';
import Toc, { TocItem } from '@/components/Toc';
import { PaginationType } from '@/lib/getPagination';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
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
    useLockBodyScroll(modal);
    const router = useRouter();
    let newNav;
    // if 3 levels of directory
    // @ts-ignore
    if (router.query.slug[0] !== 'v1' && router.query.slug[0] !== 'v2') {
        // TODO: remove this ^ not needed if `v1` & `v2` docs are replaced
        // @ts-ignore
        if (router.query.slug?.length > 3) {
            // @ts-ignore
            newNav = nav[router.query.slug[1]];
            // ? Case for `api-references`
            // @ts-ignore
            if (router.query.slug[0] === 'api-references') {
                // object -> folder-> content
                // @ts-ignore
                newNav = nav[router.query.slug[1]][router.query.slug[2]];
            }
        }
    } else {
        newNav = nav;
    }
    return (
        <>
            <div className="page">
                <NextSeo {...SEO} />
                <Header
                    modal={modal}
                    setModal={setModal}
                    menuState={menuState}
                    docs={allDocs}
                    currentDocSlug={currentDocSlug}
                />
                <div className="ctx">
                    <div style={{ borderRight: '1px solid var(--gray6)' }}>
                        <Sidebar menu={menu} nav={newNav} />
                    </div>
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
                    html {
                        scroll-behavior: smooth !important;
                        scroll-padding-top: 120px !important;
                    }
                    .page {
                        max-width: 1600px;
                        margin: 0 auto;
                    }
                    .ctx {
                        display: flex;
                        filter: blur(${modal ? '10px' : '0px'});
                    }
                    .wrapper-ctx {
                        display: flex;
                        width: 100%;
                    }
                    article {
                        max-width: 760px;
                        width: 100%;
                        padding: 2rem 3rem;
                        display: flex;
                        flex-direction: column;
                        align-items: stretch;
                    }
                    .content-ctx {
                        min-height: 100vh;
                    }
                    .content-wrapper {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
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
