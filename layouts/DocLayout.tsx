import React, { useState } from 'react';
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
    const menuState = { menu, setMenu };
    useLockBodyScroll(modal);

    return (
        <>
            <div style={{ margin: '0' }}>
                <NextSeo {...SEO} />
                <SegmentAnalytics options={{}} title={frontMatter.title} />
                <Header modal={modal} setModal={setModal} menuState={menuState} />
                <div
                    className="ctx"
                    style={{
                        display: 'flex',
                        paddingTop: '1rem',
                        justifyContent: 'center',
                        width: '100%',
                        backgroundColor: 'var(--docs_bg_content) !important;'
                    }}>
                    <div
                        className="content-wrapper"
                        style={{
                            width: '100%',
                            display: 'flex',
                            maxWidth: '1500px',
                            justifyContent: 'space-between',
                            backgroundColor: 'var(--docs_bg_content);'
                        }}>
                        <div
                            className="sidebar-container"
                            style={{ backgroundColor: 'var(--docs_bg_content) !important;' }}>
                            <Sidebar menuState={menuState} nav={nav} />
                        </div>
                        {!menu ? children : null}
                    </div>
                </div>
            </div>
        </>
    );
}
