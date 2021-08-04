import hydrate from 'next-mdx-remote/hydrate';
import MDXComponents from '@/components/MDXComponents';
import React from 'react';
import { getFiles, getFileBySlug } from '@/lib/mdx';
import GuideLayout from '@/layouts/GuideLayout';

export default function Blog({ mdxSource, frontMatter }) {
    const content = hydrate(mdxSource, {
        components: MDXComponents
    });
    return <GuideLayout frontMatter={frontMatter}>{content}</GuideLayout>;
}

export async function getStaticPaths() {
    const posts = await getFiles('react');

    return {
        paths: posts.map((p) => ({
            params: {
                slug: p.replace(/\.mdx/, '')
            }
        })),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    // params: { slug: 'blog-slug' }
    const post = await getFileBySlug('react', params.slug);
    return { props: post };
}
