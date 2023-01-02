import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Header from '@/components/Header';
import SegmentAnalytics from '@/components/SegmentAnalytics';
import Sidebar from '@/components/Sidebar';
import useLockBodyScroll from '@/lib/useLockBodyScroll';

interface Props {
    children: JSX.Element;
}

export default function Layout({ children }: Props) {
    const { frontMatter, nav } = children.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const router = useRouter() as any;
    const SEO = {
        title: `${frontMatter.title || '100ms Docs'} | 100ms`,
        openGraph: {
            title: `${frontMatter.title || '100ms Docs'} | 100ms`
        },
        canonical: `${process.env.NEXT_PUBLIC_CANONICAL_BASE_URL}${
            router.asPath === '/' ? '' : router.asPath.split('?')[0]
        }`
    };
    const [menu, setMenu] = useState(false);
    const [modal, setModal] = useState(false);
    const [url, setUrl] = useState('');
    useEffect(() => {
        if (typeof window !== 'undefined') setUrl(window.location.pathname);
    }, []);
    const menuState = { menu, setMenu };
    useLockBodyScroll(modal);
    return (
        <>
            <div style={{ margin: '0' }}>
                <NextSeo {...SEO} />
                <SegmentAnalytics options={{}} title={frontMatter.title} />
                <Header modal={modal} setModal={setModal} menuState={menuState} />
                <div className="ctx">
                    <div className="content-wrapper">
                        <div className="sidebar-container">
                            <Sidebar menuState={menuState} nav={nav} url={url} />
                        </div>
                        {!menu ? children : null}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .ctx {
                    display: flex;
                    padding-top: 16px;
                    justify-content: center;
                    width: 100%;
                    background-color: var(--docs_bg_content) !important;
                }
                .content-wrapper {
                    width: 100%;
                    display: flex;
                    max-width: 1500px;
                    justify-content: space-between;
                    background-color: var(--docs_bg_content);
                }
                .sidebar-container {
                    background-color: var(--docs_bg_content) !important;
                }
            `}</style>
        </>
    );
}
