/* eslint-disable @typescript-eslint/no-explicit-any */
import hydrate from 'next-mdx-remote/hydrate';
import { getFiles, getFileBySlug } from '@/lib/mdx';
import NoteLayout from '@/layouts/NoteLayout';
import MDXComponents from '@/components/MDXComponents';
import React from 'react';

export default function Blog({ mdxSource, frontMatter }: any) {
    const content = hydrate(mdxSource, {
        components: MDXComponents
    });
    return <NoteLayout frontMatter={frontMatter}>{content}</NoteLayout>;
}

export async function getStaticPaths() {
    const notes = await getFiles('test');

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
    const post = await getFileBySlug('test', params.slug);
    return { props: post };
}
