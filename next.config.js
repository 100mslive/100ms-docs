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
                source: '/android/v2/guides/quickstart',
                destination: '/android/v2/get-started/quickstart',
                permanent: true
            },
            {
                source: '/android/v2/guides/token',
                destination: '/android/v2/get-started/token',
                permanent: true
            },
            {
                source: '/android/v2/guides/token-endpoint',
                destination: '/android/v2/get-started/token-endpoint',
                permanent: true
            },
            {
                source: '/android/v2/features/integration',
                destination: '/android/v2/how--to-guides/install-the-sdk/integration',
                permanent: true
            },
            {
                source: '/android/v2/migrations/jitpack-maven-central',
                destination: '/android/v2/how--to-guides/install-the-sdk/jitpack-maven-central',
                permanent: true
            },
            {
                source: '/android/v2/guides/proguard-config',
                destination: '/android/v2/how--to-guides/install-the-sdk/proguard-config',
                permanent: true
            },
            {
                source: '/android/v2/foundation/size',
                destination: '/android/v2/how--to-guides/install-the-sdk/size',
                permanent: true
            },
            {
                source: '/android/v2/features/join',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/join',
                permanent: true
            },
            {
                source: '/android/v2/features/leave',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/leave',
                permanent: true
            },
            {
                source: '/android/v2/features/preview',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/preview',
                permanent: true
            },
            {
                source: '/android/v2/features/render-video',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/render-video/render-video',
                permanent: true
            },
            {
                source: '/android/v2/features/render-video-old',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/render-video/surfaceview/render-video-old',
                permanent: true
            },
            {
                source: '/android/v2/migrations/surfaceview-migration',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/render-video/surfaceview/surfaceview-migration',
                permanent: true
            },
            {
                source: '/android/v2/features/auto-video-degrade-restore',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/render-video/auto-video-degrade-restore',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/simulcast',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/render-video/simulcast',
                permanent: true
            },
            {
                source: '/android/v2/features/Pip-Mode',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/render-video/Pip-Mode',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/audio-level',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/render-video/audio-level',
                permanent: true
            },
            {
                source: '/android/v2/features/Mirror',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/render-video/Mirror',
                permanent: true
            },
            {
                source: '/android/v2/features/mute',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/mute',
                permanent: true
            },
            {
                source: '/android/v2/features/chat',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/chat',
                permanent: true
            },
            {
                source: '/android/v2/features/screen-share',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/screen-share',
                permanent: true
            },
            {
                source: '/android/v2/features/audio-share',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/local-audio-share',
                permanent: true
            },
            {
                source: '/android/v2/features/change-user-name',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/change-user-name',
                permanent: true
            },
            {
                source: '/android/v2/features/interruption-handling',
                destination: '/android/v2/how--to-guides/listen-to-room-events/interruption-handling',
                permanent: true
            },
            {
                source: '/android/v2/features/PeerCount',
                destination: '/android/v2/how--to-guides/listen-to-room-events/room-updates',
                permanent: true
            },
            {
                source: '/android/v2/features/change-role',
                destination: '/android/v2/how--to-guides/interact-with-room/interact-with-peer/change-role',
                permanent: true
            },
            {
                source: '/android/v2/features/remove-peer',
                destination: '/android/v2/how--to-guides/interact-with-room/interact-with-peer/remove-peer',
                permanent: true
            },
            {
                source: '/android/v2/features/remote-mute',
                destination: '/android/v2/how--to-guides/interact-with-room/interact-with-peer/remote-mute',
                permanent: true
            },
            {
                source: '/android/v2/features/end-room',
                destination: '/android/v2/how--to-guides/interact-with-room/end-room',
                permanent: true
            },
            {
                source: '/android/v2/features/rtmp-recording',
                destination: '/android/v2/how--to-guides/record-and-live-stream/rtmp-recording',
                permanent: true
            },
            {
                source: '/android/v2/features/hls',
                destination: '/android/v2/how--to-guides/record-and-live-stream/hls',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/peer-metadata-update',
                destination: '/android/v2/how--to-guides/build-interactive-features/peer-metadata-update',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/hls-timed-metadata',
                destination: '/android/v2/how--to-guides/build-interactive-features/hls-timed-metadata',
                permanent: true
            },
            {
                source: '/android/v2/features/error-handling',
                destination: '/android/v2/how--to-guides/debugging/error-handling',
                permanent: true
            },
            {
                source: '/android/v2/debugging/log_utils',
                destination: '/android/v2/how--to-guides/debugging/log_utils',
                permanent: true
            },
            {
                source: '/android/v2/features/network-quality-reports',
                destination: '/android/v2/how--to-guides/measure-network-quality-and-performance/network-quality-reports',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/peer-network-quality',
                destination: '/android/v2/how--to-guides/measure-network-quality-and-performance/peer-network-quality',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/webrtc-stats',
                destination: '/android/v2/how--to-guides/measure-network-quality-and-performance/webrtc-stats',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/hls-stats',
                destination: '/android/v2/how--to-guides/measure-network-quality-and-performance/hls-stats',
                permanent: true
            },
            {
                source: '/android/v2/features/echo-cancellation',
                destination: '/android/v2/how--to-guides/configure-your-device/echo-cancellation',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/track-settings',
                destination: '/android/v2/how--to-guides/set-up-video-conferencing/track-settings',
                permanent: true
            },
            {
                source: '/android/v2/features/audio-output-routing',
                destination: '/android/v2/how--to-guides/configure-your-device/speaker/audio-output-routing',
                permanent: true
            },
            {
                source: '/android/v2/features/audio-mode',
                destination: '/android/v2/how--to-guides/configure-your-device/speaker/audio-mode',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/camera-controls',
                destination: '/android/v2/how--to-guides/configure-your-device/camera-controls',
                permanent: true
            },
            {
                source: '/android/v2/plugins/virtual-background',
                destination: '/android/v2/how--to-guides/extend-capabilities/plugins/virtual-background',
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
