/* eslint-disable @typescript-eslint/no-explicit-any */
import hydrate from 'next-mdx-remote/hydrate';
import { getFiles, getFileBySlug } from '@/lib/mdx';
import MDXComponents from '@/components/MDXComponents';
import React from 'react';
import DocLayout from '@/layouts/DocLayout';
import getSidebarData, { SidebarDataType } from '@/lib/getSidebarData';

export default function Blog(data: any) {
    const { mdxSource, frontMatter } = data.post;
    const sideArr = data.sidebarData;
    const content = hydrate(mdxSource, {
        components: MDXComponents
    });
    return (
        <DocLayout allSlugList={data.allSlugList} frontMatter={frontMatter} docsArr={sideArr}>
            {content}
        </DocLayout>
    );
}

export async function getStaticPaths() {
    const notes = await getFiles('/v1/100ms-v1');
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
    const { sidebarData, allSlugList }: SidebarDataType = await getSidebarData();
    const post = await getFileBySlug('/v1/100ms-v1', params.slug);
    const data = { sidebarData, post, allSlugList };
    return { props: data };
}
