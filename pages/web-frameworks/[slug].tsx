/* eslint-disable @typescript-eslint/no-explicit-any */
import hydrate from 'next-mdx-remote/hydrate';
import { getFiles, getFileBySlug } from '@/lib/mdx';
import MDXComponents from '@/components/MDXComponents';
import React from 'react';
import DocLayout from '@/layouts/DocLayout';
import getSidebarData from '@/lib/getSidebarData';

export default function Blog(data: any) {
    const { mdxSource, frontMatter } = data.post;
    const sideArr = data.sidebarData;
    const content = hydrate(mdxSource, {
        components: MDXComponents
    });
    return (
        <DocLayout frontMatter={frontMatter} docsArr={sideArr}>
            {content}
        </DocLayout>
    );
}

export async function getStaticPaths() {
    const notes = await getFiles('web-frameworks');

    return {
        paths: notes.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, '')
            }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }: any) {
    // params: { slug: 'blog-slug' }
    const sidebarData = await getSidebarData();
    const post = await getFileBySlug('web-frameworks', params.slug);
    const data = { sidebarData, post };
    return { props: data };
}
