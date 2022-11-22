import Header from '@/components/Header';
import SegmentAnalytics from '@/components/SegmentAnalytics';
import Sidebar from '@/components/Sidebar';
import useLockBodyScroll from '@/lib/useLockBodyScroll';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Props {
    children: JSX.Element;
}

export default function Layout({ children }: Props) {
    const { frontMatter, nav } = children.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const router = useRouter() as any;
    const SEO = {
        title: `${frontMatter.title || '100ms Docs'
            } | 100ms`,
        openGraph: {
            title: `${frontMatter.title || '100ms Docs'
                } | 100ms`
        },
        canonical: `${process.env.NEXT_PUBLIC_CANONICAL_BASE_URL}${router.asPath === '/' ? '' : router.asPath.split('?')[0]
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
                <div className="ctx">
                    <div className="content-wrapper">
                        <div
                            className="sidebar-container"
                            style={{
                                borderRight: '1px solid var(--new_border_default)'
                            }}>
                            <Sidebar menuState={menuState} nav={nav} />
                        </div>
                        {!menu ? children : null}
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
        </>
    );
}
