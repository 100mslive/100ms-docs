/* eslint-disable react/no-danger */
import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link href="/docs/logo.svg" rel="shortcut icon" />
                    <link rel="preconnect" href="https://cdn.usefathom.com" crossOrigin="" />
                    <link
                        href="/docs/static/favicons/apple-touch-icon.png"
                        rel="apple-touch-icon"
                        sizes="180x180"
                    />
                    <link
                        href="/docs/static/favicons/favicon-32x32.png"
                        rel="icon"
                        sizes="32x32"
                        type="image/png"
                    />
                    <link
                        href="/docs/static/favicons/favicon-16x16.png"
                        rel="icon"
                        sizes="16x16"
                        type="image/png"
                    />
                    <link
                        color="#4a9885"
                        href="/docs/static/favicons/safari-pinned-tab.svg"
                        rel="mask-icon"
                    />
                    <meta content="#ffffff" name="theme-color" />
                    <meta content="#ffffff" name="msapplication-TileColor" />
                    <meta
                        content="/docs/static/favicons/browserconfig.xml"
                        name="msapplication-config"
                    />
                    {/* To Avoid Flickering */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
        var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
          analytics.load('${process.env.NEXT_PUBLIC_SEGMENT_ID}');
          var url = new URL(window.location.href);
          analytics.track('page.viewed',{
            title:document.title,
            path:window.location.hostname,
            pathname:window.location.pathname,
            href:window.location.href,
            utm_source: url.searchParams.get("utm_source"),
            utm_medium: url.searchParams.get("utm_medium"),
            utm_campaign: url.searchParams.get("utm_campaign"),
            utm_keyword: url.searchParams.get("utm_keyword"),
            utm_term: url.searchParams.get("utm_term")
          });}
   `
                        }}
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
