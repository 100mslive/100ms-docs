/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import 'inter-ui/inter.css';
import '@/styles/theme.css';

const Application: NextPage<AppProps<{}>> = ({ Component, pageProps }) => (
    <>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
    </>
);

export default Application;
