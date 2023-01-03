import React from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';

interface Props {
    children: JSX.Element;
}

export default function Layout({ children }: Props) {
    const { frontMatter } = children.props;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const router = useRouter() as any;
    const SEO = {
        title: `${frontMatter.title || '100ms Docs'} | 100ms`,
        openGraph: {
            title: `${frontMatter.title || '100ms Docs'} | 100ms`
        },
        canonical: `${process.env.NEXT_PUBLIC_CANONICAL_BASE_URL}${
            router.asPath === '/' ? '' : router.asPath.split('?')[0]
        }`
    };

    return (
        <>
            <div style={{ margin: '0' }}>
                <NextSeo {...SEO} />
                {children}
            </div>
        </>
    );
}
