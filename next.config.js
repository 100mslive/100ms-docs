/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    basePath: '/docs',
    webpack: (config, { isServer, dev }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            };
        }
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat'
            });
        }

        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader'
        });

        return config;
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
                source: '/ios/v2/release-notes/Release-Notes',
                destination: '/ios/v2/changelog/release-notes',
                permanent: false
            },
            {
                source: '/android/v2/release-notes/release-notes',
                destination: '/android/v2/changelog/release-notes',
                permanent: false
            },
            {
                source: '/javascript/v2/release-notes/release-notes',
                destination: '/javascript/v2/changelog/release-notes',
                permanent: false
            },
            {
                source: '/react-native/v2/release-notes/release-notes',
                destination: '/react-native/v2/changelog/release-notes',
                permanent: false
            },
            {
                source: '/flutter/v2/release-notes/release-notes',
                destination: '/flutter/v2/changelog/release-notes',
                permanent: false
            }
        ];
    }
};

module.exports = nextConfig;
