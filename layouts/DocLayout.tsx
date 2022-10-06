import Header from '@/components/Header';
import SegmentAnalytics from '@/components/SegmentAnalytics';
import Sidebar from '@/components/Sidebar';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

interface Props {
    children: JSX.Element
}

export default function Layout({ children }: Props) {
    const { frontMatter, allDocs } = children.props
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const router = useRouter() as any;
    const {
        query: { slug }
    } = useRouter();
    const [currentDocSlug] = slug as string[];
    const SEO = {
        title: `${frontMatter.title || '100ms Docs'
            } | 100ms - Video conferencing infrastructure for a video-first world`,
        openGraph: {
            title: `${frontMatter.title || '100ms Docs'
                } | 100ms - Video conferencing infrastructure for a video-first world`
        },
        canonical: `${process.env.NEXT_PUBLIC_CANONICAL_BASE_URL}${router.asPath === '/' ? '' : router.asPath.split('?')[0]
            }`
    };
    const [menu, setMenu] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const menuState = { menu, setMenu };

    let newNav;
    let { nav } = children.props
    nav = nav[currentDocSlug]
    if (router.query.slug[0] !== 'v1' && router.query.slug[0] !== 'v2') {
        if (router.query.slug?.length > 3) {
            newNav = nav[router.query.slug[1]];
            if (router.query.slug[0] === 'api-reference') {
                // if (router.query.slug[1] === 'android') {
                //     showPagination = false;
                // }
                newNav = nav[router.query.slug[1]][router.query.slug[2]];
            }
        }
    } else {
        newNav = nav;
    }

    useLockBodyScroll(modal);
    return (
        <>
            <div style={{ margin: "0" }}>
                <NextSeo {...SEO} />
                <SegmentAnalytics options={{}} title={frontMatter.title} />
                <Header modal={modal} setModal={setModal} menuState={menuState} docs={allDocs} />
                <div className="ctx" >
                    <div className="content-wrapper">
                        <div
                            className="sidebar-container"
                            style={{
                                borderRight: '1px solid var(--new_border_default)'
                            }}>
                            <Sidebar menu={menu} nav={newNav} />
                        </div>
                        {children}
                    </div>
                </div>
            </div>
            <style jsx>{`
                 .ctx {
                    display: flex;
                    width: 100%;
                    filter: blur(${modal ? '10px' : '0px'});
                    background-color: var(--sidebar_bg) !important;
                }
                .content-wrapper {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    background-color: var(--article_bg);
                }
                .sidebar-container {
                    background-color: var(--sidebar_bg) !important;
                }
                `}</style>
        </>)
}

