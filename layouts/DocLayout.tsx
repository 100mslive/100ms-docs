/* eslint-disable no-nested-ternary */
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { SidebarDataType } from '@/lib/getSidebarData';
import { NextSeo } from 'next-seo';

interface ReadingTimeType {
    text: string;
    minutes: number;
    time: number;
    words: number;
}
interface DocLayoutType {
    wordCount: number;
    readingTime: ReadingTimeType;
    title: string;
    date: string;
    slug: string;
    excerpt: string;
}

interface Props {
    docsArr: SidebarDataType[];
    frontMatter: DocLayoutType;
}

const DocLayout: React.FC<Props> = ({ docsArr, children, frontMatter }) => {
    const SEO = {
        title: `${frontMatter.title} | 100mslive`,
        description: `${frontMatter.excerpt}`,
        openGraph: {
            title: `${frontMatter.title} | 100mslive`,
            description: `${frontMatter.excerpt}`
        }
    };
    return (
        <div className="page">
            <NextSeo {...SEO} />
            <Sidebar docsArr={docsArr} />
            <article className="content">{children}</article>
            <style jsx>{`
                .page {
                    width: 100%;
                    min-height: 100%;
                    height: initial;
                    display: flex;
                }
                .content {
                    padding-top: 30px;
                    padding-left: 80px;
                    padding-bottom: 150px;
                    max-width: 750px;
                    overflow-y: scroll;
                }
            `}</style>
        </div>
    );
};

export default DocLayout;
