import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import React from 'react';
import CssBaseline from '@/styles/css-baseline';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        const styles = CssBaseline.flush();

        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    {styles}
                </>
            )
        };
    }

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
                    <link href="/static/favicons/site.webmanifest" rel="manifest" />
                    <link rel="preconnect" href="https://cdn.usefathom.com" crossOrigin="" />
                    <link
                        href="/static/favicons/apple-touch-icon.png"
                        rel="apple-touch-icon"
                        sizes="180x180"
                    />
                    <link
                        href="/static/favicons/favicon-32x32.png"
                        rel="icon"
                        sizes="32x32"
                        type="image/png"
                    />
                    <link
                        href="/static/favicons/favicon-16x16.png"
                        rel="icon"
                        sizes="16x16"
                        type="image/png"
                    />
                    <link
                        color="#4a9885"
                        href="/static/favicons/safari-pinned-tab.svg"
                        rel="mask-icon"
                    />
                    <meta content="#ffffff" name="theme-color" />
                    <meta content="#ffffff" name="msapplication-TileColor" />
                    <meta
                        content="/static/favicons/browserconfig.xml"
                        name="msapplication-config"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
