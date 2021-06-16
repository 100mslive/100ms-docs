import Sidebar from '@/components/Sidebar';
import { NextSeo } from 'next-seo';
import React from 'react';

type NavRoute = {
    url: string;
    title: string;
};

interface Props {
    frontMatter: {
        title: string;
        nav: number;
    };
    nav: Record<string, Record<string, NavRoute>>;
}

const DocLayout: React.FC<Props> = ({ frontMatter, nav, children }) => {
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
            <article className="content">{children}</article>
            <hr />
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
