import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import Header from '@/components/Header';
import SegmentAnalytics from '@/components/SegmentAnalytics';
import Sidebar from '@/components/Sidebar';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
import { SEOText } from '@/lib/utils';

interface Props {
    children: JSX.Element;
}

export default function DocLayout({ children }: Props) {
    const { frontMatter, nav, allNav } = children.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const router = useRouter() as any;
    const SEO = {
        title: `${frontMatter.title || '100ms Docs'} | 100ms`,
        description: frontMatter?.description || SEOText,
        openGraph: {
            title: `${frontMatter.title || '100ms Docs'} | 100ms`,
            description: frontMatter?.description || SEOText
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
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%'
                    }}>
                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                        <Sidebar
                            menuState={menuState}
                            setModal={setModal}
                            nav={nav}
                            allNav={allNav}
                            baseViewOnly={false}
                            hideBorder={false}
                        />
                        {!menu ? children : null}
                    </div>
                </div>
            </div>
        </>
    );
}
