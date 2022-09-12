/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import SEO from '../next-seo.config';
import 'inter-ui/inter.css';
import '@/styles/theme.css';
import '@/styles/nprogress.css';

declare global {
    interface Window {
        analytics: any;
    }
}

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
    const router = useRouter();
    useEffect(() => {
        router.events.on('routeChangeStart', () => NProgress.start());
        router.events.on('routeChangeComplete', () => NProgress.done());
        router.events.on('routeChangeError', () => NProgress.done());
    }, []);

    return (
        <>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} key={router.asPath} />
        </>
    );
};

export default Application;
