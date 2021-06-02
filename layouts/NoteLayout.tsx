import React, { PropsWithChildren } from 'react';
import { NoteLayoutType } from '@/typings/noteLayout';
import { handleDate } from '@/lib/handleDate';
import { NextSeo } from 'next-seo';
import MainLayout from './MainLayout';

const BlogLayout: React.FC<PropsWithChildren<NoteLayoutType>> = ({ children, frontMatter }) => {
    const SEO = {
        title: `${frontMatter.title} | by Deepankar Bhade`,
        description: `${frontMatter.excerpt}`,
        openGraph: {
            title: `${frontMatter.title} | by Deepankar Bhade`,
            description: `${frontMatter.excerpt}`,
            type: `website`
        }
    };
    return (
        <MainLayout>
            <NextSeo {...SEO} />
            <article>
                <h1>{frontMatter.title}</h1>
                <div className="note-info">
                    <div>
                        <svg
                            className="avatar"
                            viewBox="0 0 50 50"
                            xmlns="http://www.w3.org/2000/svg"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            strokeLinejoin="round"
                            strokeMiterlimit="2">
                            <path fill="none" d="M0 0h50v50H0z" />
                            <path
                                d="M10.816 20.995l9.875 5.599v5.498l-9.875-5.498v-5.599z"
                                fill="var(--accents4)"
                            />
                            <path
                                d="M30.566 20.995l-9.875 5.599v5.498l9.875-5.498 1.687-3.15-1.687-2.449z"
                                fill="var(--accents6)"
                            />
                            <path
                                d="M10.816 10.48l9.875 5.599v5.498l-9.875-5.498V10.48zm0 21.612l9.875 5.599v5.498l-9.875-5.498v-5.599z"
                                fill="var(--accents4)"
                            />
                            <path
                                d="M20.691 16.028v5.549l11.561-6.554 5.211 7.787-5.211 8.314-11.561 6.516v5.549l15.129-8.475 6.904-11.904-8.781-13.999-13.252 7.217z"
                                fill="var(--accents6)"
                            />
                        </svg>
                        <span>Deepankar Bhade / </span>
                        <span className="date-string">{handleDate(frontMatter.date)}</span>
                    </div>
                    <span>{frontMatter.readingTime.text}</span>
                </div>
                {children}
            </article>

            <style jsx>
                {`
                    h1 {
                        margin-bottom: 30px;
                        line-height: 1.2;
                    }
                    .note-info {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin: 20px 0px;
                    }
                    .note-info div {
                        display: flex;
                        align-items: center;
                    }
                    .note-info .avatar {
                        border-radius: 50%;
                        width: 30px;
                        height: 30px;
                        border: 1px solid var(--accents3);
                    }
                    .note-info span {
                        font-size: 14px;
                        font-weight: 600;
                        margin-left: 10px;
                    }
                    .note-info .date-string {
                        color: var(--accents5);
                    }
                `}
            </style>
        </MainLayout>
    );
};

export default BlogLayout;
