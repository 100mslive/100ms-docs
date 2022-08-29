/* eslint-disable import/no-extraneous-dependencies */
import '@/styles/theme.css';
import 'inter-ui/inter.css';
import { NextPage } from 'next';
import { DefaultSeo } from 'next-seo';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import SEO from '../next-seo.config';

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
