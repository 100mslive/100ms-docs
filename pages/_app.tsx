/* eslint-disable import/no-extraneous-dependencies */
import '@/styles/theme.css';
import 'inter-ui/inter.css';
import { NextPage } from 'next';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import SEO from '../next-seo.config';

const HMSThemeProvider = dynamic(
    () => import('@100mslive/react-ui').then((mod) => mod.HMSThemeProvider),
    { ssr: true }
);

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => {
    const router = useRouter();
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
