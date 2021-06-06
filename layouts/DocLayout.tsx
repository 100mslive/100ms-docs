/* eslint-disable no-nested-ternary */
import React from 'react';
import Sidebar from '@/components/Sidebar';
import { SidebarType } from '@/lib/getSidebarData';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';
import getPagination from '@/lib/getPagination';
import Pagination from '@/components/Pagination';

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
    docsArr: SidebarType[];
    frontMatter: DocLayoutType;
    allSlugList: string[];
}

const DocLayout: React.FC<Props> = ({ docsArr, children, frontMatter, allSlugList }) => {
    const SEO = {
        title: `${frontMatter.title} | 100ms - Video conferencing infrastructure for a video-first world`,
        description: `${frontMatter.excerpt}`,
        openGraph: {
            title: `${frontMatter.title} | 100ms - Video conferencing infrastructure for a video-first world`,
            description: `${frontMatter.excerpt}`
        }
    };
    const router = useRouter();
    const { previousPost, nextPost } = getPagination(allSlugList, router.asPath);
    return (
        <div className="page">
            <NextSeo {...SEO} />
            <Sidebar docsArr={docsArr} />
            <article className="content">
                {children}
                <hr />
                <Pagination next={nextPost} prev={previousPost} />
                <hr />
            </article>
            <style jsx>{`
                .page {
                    position: relative;
                    width: 100%;
                    min-height: 100%;
                    height: initial;
                    display: flex;
                }
                .content {
                    padding-top: 30px;
                    padding-left: 80px;
                    padding-bottom: 350px;
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
