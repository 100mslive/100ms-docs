/* eslint-disable import/no-extraneous-dependencies */
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { DefaultSeo } from 'next-seo';
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

const HMSThemeProvider = dynamic(
  () => import("@100mslive/react-ui").then((mod) => mod.HMSThemeProvider),
  { ssr: true }
);

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
    const router = useRouter();
    const userDetails = currentUser();
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!!userDetails && Object.keys(userDetails).length !== 0 && count === 0) {
            window.analytics.identify(userDetails.customer_id, {
                email: userDetails.email,
                first_name: userDetails.first_name,
                last_name: userDetails.last_name,
                user_id: userDetails.user_id,
                data_account_id: userDetails.customer_id,
                api_version: userDetails.api_version
            });
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
            <HMSThemeProvider>
                <Component {...pageProps} key={router.asPath} />
            </HMSThemeProvider>
        </>
    );
};

export default Application;
