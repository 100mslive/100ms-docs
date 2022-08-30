/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import SEO from '../next-seo.config';
import 'inter-ui/inter.css';
import '@/styles/theme.css';

declare global {
    interface Window {
        analytics: any;
    }
}

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
    const router = useRouter();

    return (
        <>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} key={router.asPath} />
        </>
    );
};

export default Application;
