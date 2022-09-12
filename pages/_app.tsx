/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { useRouter } from 'next/router';
import NProgress from 'nprogress';
import SEO from '../next-seo.config';
import { currentUser } from '../lib/currentUser';
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
    const userDetails = currentUser();
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!!userDetails && Object.keys(userDetails).length !== 0 && count === 0) {
            window.analytics.identify(userDetails.customer_id, {});
            setCount(count + 1);
        }
    }, [userDetails]);

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
