const { formatDiagnosticsWithColorAndContext } = require('typescript');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    basePath: '/docs',
    webpack: (config, { isServer, dev }) => {
        // Fixes npm packages that depend on `fs` module

        // config.node = {
        //     fs: 'empty'
        // };

        // if (!dev && !isServer) {
        //     Object.assign(config.resolve.alias, {
        //         react: 'preact/compat',
        //         'react-dom/test-utils': 'preact/test-utils',
        //         'react-dom': 'preact/compat'
        //     });
        // }

        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader'
        });

        return config;
    },
    async rewrites() {
        return [
            {
                source: '/ios/v2/foundation/Security-and-tokens',
                destination: '/ios/v2/foundation/security-and-tokens'
            },
            {
                source: '/ios/v2/foundation/Basics',
                destination: '/ios/v2/foundation/basics'
            },
            {
                source: '/ios/v2/features/Integration',
                destination: '/ios/v2/features/integration'
            },
            {
                source: '/ios/v2/guides/Token',
                destination: '/ios/v2/guides/token'
            },
            {
                source: '/ios/v2/guides/Quickstart',
                destination: '/ios/v2/guides/quickstart'
            }
        ];
    },
    async redirects() {
        return [
            {
                source: '/:path((?!docs).*)',
                destination: `${process.env.NEXT_PUBLIC_HMS_WEBSITE_DOMAIN || ''}/docs/:path*`,
                permanent: true,
                basePath: false
            },
            {
                source: '/server-side/v2/foundation/basics',
                destination: '/server-side/v2/introduction/basics',
                permanent: false
            },
            {
                source: '/server-side/v2/foundation/templates-and-roles',
                destination: '/server-side/v2/policy/template-object',
                permanent: false
            },
            {
                source: '/server-side/v2/foundation/webhook',
                destination: '/server-side/v2/introduction/webhook',
                permanent: false
            },
            {
                source: '/server-side/v2/foundation/authentication-and-tokens',
                destination: '/server-side/v2/introduction/authentication-and-tokens',
                permanent: false
            },
            {
                source: '/server-side/v2/foundation/firewall-and-ports',
                destination: '/server-side/v2/introduction/firewall-and-ports',
                permanent: false
            },
            {
                source: '/server-side/v2/guides/quickstart',
                destination: '/docs/server-side/v2/introduction/basics',
                permanent: false
            },
            {
                source: '/server-side/v2/features/room',
                destination: '/server-side/v2/Rooms/object',
                permanent: false
            },
            {
                source: '/server-side/v2/features/session',
                destination: '/server-side/v2/Sessions/object',
                permanent: false
            },
            {
                source: '/server-side/v2/features/recording',
                destination: '/server-side/v2/Destinations/recording',
                permanent: false
            },
            {
                source: '/server-side/v2/features/rtmp-streaming-and-browser-recording',
                destination: '/server-side/v2/Destinations/rtmp-streaming-and-browser-recording',
                permanent: false
            },
            {
                source: '/api-reference/server-side/v2/home/content',
                destination: '/server-side/v2/introduction/basics',
                permanent: false
            },
            {
                source: '/react-native/v2/features/hls-streaming',
                destination: '/react-native/v2/features/hls',
                permanent: false
            },
            {
                // https://www.markhneedham.com/blog/2022/07/27/vercel-redirect-wildcards-nested-paths/
                source: '/javascript/v2/guides:path(.*)',
                destination: '/javascript/v2/get-started:path',
                permanent: true
            },
            // start redirects for new JS how-to guides structure
            {
                source: '/javascript/v2/advanced-features/peer-metadata',
                destination: '/javascript/v2/how--to-guides/build-interactive-features/peer-metadata',
                permanent: true
            },
            {
                source: '/javascript/v2/features/:slug(change-role|end-room|remote-mute|remove-peer)',
                destination: '/javascript/v2/how--to-guides/control-remote-peers/:slug',
                permanent: true
            },
            {
                source: '/javascript/v2/advanced-features/volume-control',
                destination: '/javascript/v2/how--to-guides/control-remote-peers/volume-control',
                permanent: true
            },
            {
                source: '/javascript/v2/features/error-handling',
                destination: '/javascript/v2/how--to-guides/debugging/error-handling',
                permanent: true
            },
            {
                source: '/javascript/v2/debugging/:slug(faq|known-issues)',
                destination: '/javascript/v2/how--to-guides/debugging/:slug',
                permanent: true
            },
            {
                source: '/javascript/v2/features/log-level',
                destination: '/javascript/v2/how--to-guides/debugging/log-level',
                permanent: true
            },
            {
                source: '/javascript/v2/debugging/debugging',
                destination: '/javascript/v2/how--to-guides/debugging/overview',
                permanent: true
            },
            {
                source: '/javascript/v2/advanced-features/:slug(custom-tracks|playlist)',
                destination: '/javascript/v2/how--to-guides/extend-capabilities/custom-tracks/:slug',
                permanent: true
            },
            {
                source: '/javascript/v2/plugins/:path(.*)',
                destination: '/javascript/v2/how--to-guides/extend-capabilities/plugins/:path(.*)',
                permanent: true
            },
            {
                source: '/javascript/v2/features/store-appdata',
                destination: '/javascript/v2/how--to-guides/extend-capabilities/store-appdata',
                permanent: true
            },
            {
                source: '/javascript/v2/debugging/supported-devices',
                destination: '/javascript/v2/how--to-guides/going-live/supported-devices',
                permanent: true
            },
            {
                source: '/javascript/v2/features/integration',
                destination: '/javascript/v2/how--to-guides/install-the-sdk/integration',
                permanent: true
            },
            {
                source: '/javascript/v2/features/notifications',
                destination: '/javascript/v2/how--to-guides/listen-to-room-events/notifications',
                permanent: true
            },
            {
                source: '/javascript/v2/advanced-features/:slug(connection-quality|hls-stats|stats)',
                destination: '/javascript/v2/how--to-guides/measure-network-quality-and-performance/:slug',
                permanent: true
            },
            {
                source: '/javascript/v2/features/:slug(hls|rtmp-recording)',
                destination: '/javascript/v2/how--to-guides/record-and-live-stream/:slug',
                permanent: true
            },
            {
                source: '/javascript/v2/features/:slug(chat|device-change|join|leave|mute|peer-name|preview|screen-share)',
                destination: '/javascript/v2/how--to-guides/set-up-video-conferencing/:slug',
                permanent: true
            },
            {
                source: '/javascript/v2/advanced-features/audio-level',
                destination: '/javascript/v2/how--to-guides/set-up-video-conferencing/render-video/audio-level',
                permanent: true
            },
            {
                source: '/javascript/v2/features/render-video',
                destination: '/javascript/v2/how--to-guides/set-up-video-conferencing/render-video/overview',
                permanent: true
            },
            {
                source: '/javascript/v2/features/:slug(pip-mode|sub-degradation)',
                destination: '/javascript/v2/how--to-guides/set-up-video-conferencing/render-video/:slug',
                permanent: true
            },
            {
                source: '/javascript/v2/advanced-features/simulcast',
                destination: '/javascript/v2/how--to-guides/set-up-video-conferencing/render-video/simulcast',
                permanent: true
            },
            {
                source: '/flutter/v2/debugging/faq',
                destination: '/flutter/v2/foundation/faq',
                permanent: true
            },
            {
                source: '/react-native/v2/guides/faq',
                destination: '/react-native/v2/foundation/faq',
                permanent: true
            },
        ];
    }
};

module.exports = nextConfig;
