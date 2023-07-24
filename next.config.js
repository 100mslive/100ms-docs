const { formatDiagnosticsWithColorAndContext } = require('typescript');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    experimental: {
        esmExternals: 'loose'
    },
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
                source: '/javascript/v2/how-to-guides/record-and-live-stream/hls/rtmp-recording',
                destination: '/javascript/v2/how-to-guides/record-and-live-stream/rtmp-recording',
                permanent: true
            },
            {
                source: '/server-side/v2/api-reference/Sessions/example-build-attendance',
                destination: '/server-side/v2/how--to-guides/build-attendance',
                permanent: true
            },
            {
                source: '/flutter/v2/foundation/faq',
                destination: '/flutter/v2/how--to-guides/debugging/faq',
                permanent: true
            },
            {
                source: '/react-native/v2/guides/faq',
                destination: '/react-native/v2/debugging/faq',
                permanent: true
            },
            {
                source: '/android/v2/foundation/faq',
                destination: '/android/v2/how--to-guides/debugging/faq',
                permanent: true
            },
            {
                source: '/ios/v2/foundation/faq',
                destination: 'ios/v2/debugging/faq',
                permanent: true
            },
            {
                source: '/(android|javascript|flutter|react-native|ios)/v2/foundation/:slug',
                destination: '/concepts/v2/concepts/:slug',
                permanent: true
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
                source: '/server-side/v2/introduction/firewall-and-ports',
                destination: '/server-side/v2/how--to-guides/firewall-and-ports',
                permanent: true
            },
            {
                source: '/server-side/v2/guides/quickstart',
                destination: '/server-side/v2/introduction/basics',
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
                destination:
                    '/javascript/v2/how--to-guides/build-interactive-features/peer-metadata',
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
                destination:
                    '/javascript/v2/how--to-guides/extend-capabilities/custom-tracks/:slug',
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
                destination:
                    '/javascript/v2/how--to-guides/measure-network-quality-and-performance/:slug',
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
                destination:
                    '/javascript/v2/how--to-guides/set-up-video-conferencing/render-video/audio-level',
                permanent: true
            },
            {
                source: '/javascript/v2/features/render-video',
                destination:
                    '/javascript/v2/how--to-guides/set-up-video-conferencing/render-video/overview',
                permanent: true
            },
            {
                source: '/javascript/v2/features/:slug(pip-mode|sub-degradation)',
                destination:
                    '/javascript/v2/how--to-guides/set-up-video-conferencing/render-video/:slug',
                permanent: true
            },
            {
                source: '/javascript/v2/advanced-features/simulcast',
                destination:
                    '/javascript/v2/how--to-guides/set-up-video-conferencing/render-video/simulcast',
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
                destination:
                    '/android/v2/how--to-guides/set-up-video-conferencing/render-video/render-video',
                permanent: true
            },
            {
                source: '/android/v2/features/render-video-old',
                destination:
                    '/android/v2/how--to-guides/set-up-video-conferencing/render-video/surfaceview/render-video-old',
                permanent: true
            },
            {
                source: '/android/v2/migrations/surfaceview-migration',
                destination:
                    '/android/v2/how--to-guides/set-up-video-conferencing/render-video/surfaceview/surfaceview-migration',
                permanent: true
            },
            {
                source: '/android/v2/features/auto-video-degrade-restore',
                destination:
                    '/android/v2/how--to-guides/set-up-video-conferencing/render-video/auto-video-degrade-restore',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/simulcast',
                destination:
                    '/android/v2/how--to-guides/set-up-video-conferencing/render-video/simulcast',
                permanent: true
            },
            {
                source: '/android/v2/features/Pip-Mode',
                destination:
                    '/android/v2/how--to-guides/set-up-video-conferencing/render-video/Pip-Mode',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/audio-level',
                destination:
                    '/android/v2/how--to-guides/set-up-video-conferencing/render-video/audio-level',
                permanent: true
            },
            {
                source: '/android/v2/features/Mirror',
                destination:
                    '/android/v2/how--to-guides/set-up-video-conferencing/render-video/Mirror',
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
                destination:
                    '/android/v2/how--to-guides/set-up-video-conferencing/local-audio-share',
                permanent: true
            },
            {
                source: '/android/v2/features/change-user-name',
                destination: '/android/v2/how--to-guides/interact-with-room/peer/change-user-name',
                permanent: true
            },
            {
                source: '/android/v2/features/interruption-handling',
                destination:
                    '/android/v2/how--to-guides/handle-interruptions/interruption-handling',
                permanent: true
            },
            {
                source: '/android/v2/features/PeerCount',
                destination: '/android/v2/how--to-guides/listen-to-room-updates/room-updates',
                permanent: true
            },
            {
                source: '/android/v2/features/change-role',
                destination: '/android/v2/how--to-guides/interact-with-room/peer/change-role',
                permanent: true
            },
            {
                source: '/android/v2/features/remove-peer',
                destination: '/android/v2/how--to-guides/interact-with-room/peer/remove-peer',
                permanent: true
            },
            {
                source: '/android/v2/features/remote-mute',
                destination: '/android/v2/how--to-guides/interact-with-room/track/remote-mute',
                permanent: true
            },
            {
                source: '/android/v2/features/end-room',
                destination: '/android/v2/how--to-guides/interact-with-room/room/end-room',
                permanent: true
            },
            {
                source: '/android/v2/features/rtmp-recording',
                destination: '/android/v2/how--to-guides/record-and-live-stream/rtmp-recording',
                permanent: true
            },
            {
                source: '/android/v2/features/hls',
                destination: '/android/v2/how--to-guides/record-and-live-stream/hls/hls',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/peer-metadata-update',
                destination:
                    '/android/v2/how--to-guides/interact-with-room/peer/peer-metadata-update',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/hls-timed-metadata',
                destination:
                    '/android/v2/how--to-guides/record-and-live-stream/hls/hls-timed-metadata',
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
                destination:
                    '/android/v2/how--to-guides/measure-network-quality-and-performance/network-quality-reports',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/peer-network-quality',
                destination:
                    '/android/v2/how--to-guides/measure-network-quality-and-performance/peer-network-quality',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/webrtc-stats',
                destination:
                    '/android/v2/how--to-guides/measure-network-quality-and-performance/webrtc-stats',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/hls-stats',
                destination:
                    '/android/v2/how--to-guides/measure-network-quality-and-performance/hls-stats',
                permanent: true
            },
            {
                source: '/android/v2/features/echo-cancellation',
                destination:
                    '/android/v2/how--to-guides/configure-your-device/microphone/echo-cancellation',
                permanent: true
            },
            {
                source: '/android/v2/how--to-guides/configure-your-device/echo-cancellation',
                destination:
                    '/android/v2/how--to-guides/configure-your-device/microphone/echo-cancellation',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/track-settings',
                destination: '/android/v2/how--to-guides/interact-with-room/track/track-settings',
                permanent: true
            },
            {
                source: '/android/v2/features/audio-output-routing',
                destination:
                    '/android/v2/how--to-guides/configure-your-device/speaker/audio-output-routing',
                permanent: true
            },
            {
                source: '/android/v2/features/audio-mode',
                destination: '/android/v2/how--to-guides/configure-your-device/speaker/audio-mode',
                permanent: true
            },
            {
                source: '/android/v2/advanced-features/camera-controls',
                destination:
                    '/android/v2/how--to-guides/configure-your-device/camera/camera-controls',
                permanent: true
            },
            {
                source: '/android/v2/plugins/virtual-background',
                destination:
                    '/android/v2/how--to-guides/extend-capabilities/plugins/virtual-background',
                permanent: true
            },
            {
                source: '/react-native/v2/guides/faq',
                destination: '/react-native/v2/foundation/faq',
                permanent: true
            },
            {
                source: '/android/v2/foundation/faq',
                destination: '/android/v2/how--to-guides/debugging/faq',
                permanent: true
            },
            {
                // https://www.markhneedham.com/blog/2022/07/27/vercel-redirect-wildcards-nested-paths/
                source: '/flutter/v2/guides:path(.*)',
                destination: '/flutter/v2/get-started:path',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/echo-cancellation',
                destination:
                    '/flutter/v2/how--to-guides/configure-your-device/microphone/echo-cancellation',
                permanent: true
            },
            {
                source: '/flutter/v2/features/audio-output-routing',
                destination:
                    '/flutter/v2/how--to-guides/configure-your-device/speaker/audio-output-routing',
                permanent: true
            },
            {
                source: '/flutter/v2/features/error-handling',
                destination: '/flutter/v2/how--to-guides/debugging/error-handling',
                permanent: true
            },
            {
                source: '/flutter/v2/foundation/faq',
                destination: '/flutter/v2/how--to-guides/debugging/faq',
                permanent: true
            },
            {
                source: '/flutter/v2/features/reconnection-handling',
                destination:
                    '/flutter/v2/how--to-guides/handle-interruptions/reconnection-handling',
                permanent: true
            },
            {
                source: '/flutter/v2/features/hmssdk',
                destination: '/flutter/v2/how--to-guides/install-the-sdk/hmssdk',
                permanent: true
            },
            {
                source: '/flutter/v2/features/integration',
                destination: '/flutter/v2/how--to-guides/install-the-sdk/integration',
                permanent: true
            },
            {
                source: '/flutter/v2/features/change-role',
                destination: '/flutter/v2/how--to-guides/interact-with-room/peer/change-role',
                permanent: true
            },
            {
                source: '/flutter/v2/features/change-user-name',
                destination: '/flutter/v2/how--to-guides/interact-with-room/peer/change-user-name',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/peer-metadata-update',
                destination:
                    '/flutter/v2/how--to-guides/interact-with-room/peer/peer-metadata-update',
                permanent: true
            },
            {
                source: '/flutter/v2/features/remove-peer',
                destination: '/flutter/v2/how--to-guides/interact-with-room/peer/remove-peer',
                permanent: true
            },
            {
                source: '/flutter/v2/features/end-room',
                destination: '/flutter/v2/how--to-guides/interact-with-room/room/end-room',
                permanent: true
            },
            {
                source: '/flutter/v2/features/session-metadata',
                destination: '/flutter/v2/how--to-guides/interact-with-room/room/session-metadata',
                permanent: true
            },
            {
                source: '/flutter/v2/features/remote-mute-unmute',
                destination:
                    '/flutter/v2/how--to-guides/interact-with-room/track/remote-mute-unmute',
                permanent: true
            },
            {
                source: '/flutter/v2/features/set-playback-allowed',
                destination:
                    '/flutter/v2/how--to-guides/interact-with-room/track/set-playback-allowed',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/set-track-settings',
                destination:
                    '/flutter/v2/how--to-guides/interact-with-room/track/set-track-settings',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/set-volume',
                destination: '/flutter/v2/how--to-guides/interact-with-room/track/set-volume',
                permanent: true
            },
            {
                source: '/flutter/v2/features/action-result-listeners',
                destination:
                    '/flutter/v2/how--to-guides/listen-to-room-updates/action-result-listeners',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/get-methods',
                destination: '/flutter/v2/how--to-guides/listen-to-room-updates/get-methods',
                permanent: true
            },
            {
                source: '/flutter/v2/features/update-listener-enums',
                destination:
                    '/flutter/v2/how--to-guides/listen-to-room-updates/update-listener-enums',
                permanent: true
            },
            {
                source: '/flutter/v2/features/update-listeners',
                destination: '/flutter/v2/how--to-guides/listen-to-room-updates/update-listeners',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/features/update-listeners',
                destination: '/flutter/v2/how--to-guides/listen-to-room-updates/update-listeners',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/features/preview',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/preview',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/features/update-listeners',
                destination: '/flutter/v2/how--to-guides/listen-to-room-updates/update-listeners',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/features/error-handling',
                destination: '/flutter/v2/how--to-guides/debugging/error-handling',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/features/auto-video-degrade-restore',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video/auto-video-degrade-restore',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/advanced-features/peer-metadata-update',
                destination:
                    '/flutter/v2/how--to-guides/interact-with-room/peer/peer-metadata-update',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/features/background-handling',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/background-handling',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/features/leave',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/leave',
                permanent: true
            },
            {
                source: '/android/v2/how--to-guides/interact-with-room/interact-with-peer/remove-peer',
                destination: '/android/v2/how--to-guides/interact-with-room/peer/remove-peer',
                permanent: true
            },
            {
                source: '/android/v2/how--to-guides/build-interactive-features/peer-metadata-update',
                destination:
                    '/android/v2/how--to-guides/interact-with-room/peer/peer-metadata-update',
                permanent: true
            },
            {
                source: '/android/v2/how--to-guides/set-up-video-conferencing/track-settings',
                destination: '/android/v2/how--to-guides/interact-with-room/track/track-settings',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/guides/token',
                destination: '/react-native/v2/get-started/token',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/interact-with-room/features/mute',
                destination: '/react-native/v2/how--to-guides/set-up-video-conferencing/mute',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/interact-with-room/features/join',
                destination: '/react-native/v2/how--to-guides/set-up-video-conferencing/join',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/interact-with-room/features/audio-share',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/local-audio-share',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/set-up-video-conferencing/features/mute',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/mute',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/set-up-video-conferencing/features/mute',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/mute',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/set-up-video-conferencing/advanced-features/set-volume',
                destination: '/flutter/v2/how--to-guides/interact-with-room/track/set-volume',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/set-up-video-conferencing/advanced-features/adaptive-bitrate',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video/adaptive-bitrate',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/handle-interruptions/release-resources',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/release-resources',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/handle-interruptions/error-handling',
                destination: '/react-native/v2/how--to-guides/debugging/error-handling',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/advanced-features/network-quality',
                destination:
                    '/react-native/v2/how--to-guides/measure-network-quality-and-performance/network-quality',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video/overview',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/features/screenshare',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/screenshare',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/features/screenshare',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/screenshare',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/features/audio-output-routing',
                destination:
                    '/react-native/v2/how--to-guides/configure-your-device/speaker/audio-output-routing',
                permanent: true
            },
            {
                source: '/flutter/v2/features/call-stats',
                destination:
                    '/flutter/v2/how--to-guides/measure-network-quality-and-performance/call-stats',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/network-quality-reports',
                destination:
                    '/flutter/v2/how--to-guides/measure-network-quality-and-performance/network-quality-reports',
                permanent: true
            },
            {
                source: '/flutter/v2/features/hls',
                destination: '/flutter/v2/how--to-guides/record-and-live-stream/hls',
                permanent: true
            },
            {
                source: '/flutter/v2/features/recording',
                destination: '/flutter/v2/how--to-guides/record-and-live-stream/recording',
                permanent: true
            },
            {
                source: '/flutter/v2/features/background-handling',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/background-handling',
                permanent: true
            },
            {
                source: '/flutter/v2/features/chat',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/chat',
                permanent: true
            },
            {
                source: '/flutter/v2/features/join',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/join',
                permanent: true
            },
            {
                source: '/flutter/v2/features/leave',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/leave',
                permanent: true
            },
            {
                source: '/flutter/v2/features/audio_sharing',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/local-audio-share',
                permanent: true
            },
            {
                source: '/flutter/v2/features/mute',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/mute',
                permanent: true
            },
            {
                source: '/flutter/v2/features/preview',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/preview',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/adaptive-bitrate',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video/adaptive-bitrate',
                permanent: true
            },
            {
                source: '/flutter/v2/features/auto-video-degrade-restore',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video/auto-video-degrade-restore',
                permanent: true
            },
            {
                source: '/flutter/v2/features/render-video',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video/overview',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/pip-mode',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video/pip-mode',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/show-audio-level',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video/show-audio-level',
                permanent: true
            },
            {
                source: '/flutter/v2/features/screen-share',
                destination: '/flutter/v2/how--to-guides/set-up-video-conferencing/screen-share',
                permanent: true
            },
            {
                source: '/flutter/v2/advanced-features/strict-privacy-applications',
                destination:
                    '/flutter/v2/how--to-guides/set-up-video-conferencing/strict-privacy-applications',
                permanent: true
            },
            {
                source: '/ios/v2/guides:path(.*)',
                destination: '/ios/v2/get-started:path',
                permanent: true
            },
            {
                source: '/ios/v2/features/error-handling',
                destination: '/ios/v2/how--to-guides/debugging/error-handling',
                permanent: true
            },
            {
                source: '/ios/v2/features/capture-snapshot',
                destination: '/ios/v2/how--to-guides/capture-frame/capture-snapshot',
                permanent: true
            },
            {
                source: '/ios/v2/plugins/local-camera-capture',
                destination: '/ios/v2/how--to-guides/capture-frame/local-camera-capture',
                permanent: true
            },
            {
                source: '/ios/v2/features/tap-to-focus',
                destination: '/ios/v2/how--to-guides/configure-your-device/camera/tap-to-focus',
                permanent: true
            },
            {
                source: '/ios/v2/features/audio-output-routing',
                destination:
                    '/ios/v2/how--to-guides/configure-your-device/speaker/audio-output-routing',
                permanent: true
            },
            {
                source: '/ios/v2/debugging/bitcode',
                destination: '/ios/v2/how--to-guides/debugging/bitcode',
                permanent: true
            },
            {
                source: '/ios/v2/foundation/faq',
                destination: '/ios/v2/how--to-guides/debugging/faq',
                permanent: true
            },
            {
                source: '/ios/v2/plugins/custom-video-plugins',
                destination:
                    '/ios/v2/how--to-guides/extend-capabilities/plugins/custom-video-plugins',
                permanent: true
            },
            {
                source: '/ios/v2/plugins/virtual-background',
                destination:
                    '/ios/v2/how--to-guides/extend-capabilities/plugins/virtual-background',
                permanent: true
            },
            {
                source: '/ios/v2/features/interruption-handling',
                destination: '/ios/v2/how--to-guides/handle-interruptions/interruption-handling',
                permanent: true
            },
            {
                source: '/ios/v2/migration-guides/03to04',
                destination: '/ios/v2/how--to-guides/install-the-sdk/03to04',
                permanent: true
            },
            {
                source: '/ios/v2/features/integration',
                destination: '/ios/v2/how--to-guides/install-the-sdk/integration',
                permanent: true
            },
            {
                source: '/ios/v2/features/change-role',
                destination: '/ios/v2/how--to-guides/interact-with-room/peer/change-role',
                permanent: true
            },
            {
                source: '/ios/v2/features/change-user-name',
                destination: '/ios/v2/how--to-guides/interact-with-room/peer/change-user-name',
                permanent: true
            },
            {
                source: '/ios/v2/advanced-features/peer-metadata-update',
                destination: '/ios/v2/how--to-guides/interact-with-room/peer/peer-metadata-update',
                permanent: true
            },
            {
                source: '/ios/v2/features/remove-peer',
                destination: '/ios/v2/how--to-guides/interact-with-room/peer/remove-peer',
                permanent: true
            },
            {
                source: '/ios/v2/features/end-room',
                destination: '/ios/v2/how--to-guides/interact-with-room/room/end-room',
                permanent: true
            },
            {
                source: '/ios/v2/features/remote-mute',
                destination: '/ios/v2/how--to-guides/interact-with-room/track/remote-mute',
                permanent: true
            },
            {
                source: '/ios/v2/features/call-stats',
                destination:
                    '/ios/v2/how--to-guides/measure-network-quality-and-performance/call-stats',
                permanent: true
            },
            {
                source: '/ios/v2/features/hls-stats',
                destination:
                    '/ios/v2/how--to-guides/measure-network-quality-and-performance/hls-stats',
                permanent: true
            },
            {
                source: '/ios/v2/features/network-quality-reports',
                destination: '/ios/v2/how--to-guides/measure-network-quality-and-performance/',
                permanent: true
            },
            {
                source: '/ios/v2/advanced-features/hls-timed-metadata',
                destination: '/ios/v2/how--to-guides/record-and-live-stream/hls/hls-timed-metadata',
                permanent: true
            },
            {
                source: '/ios/v2/features/hls',
                destination: '/ios/v2/how--to-guides/record-and-live-stream/hls/hls',
                permanent: true
            },
            {
                source: '/ios/v2/features/rtmp-recording',
                destination: '/ios/v2/how--to-guides/record-and-live-stream/rtmp-recording',
                permanent: true
            },
            {
                source: '/ios/v2/features/audio-share',
                destination: '/ios/v2/how--to-guides/set-up-video-conferencing/audio-share',
                permanent: true
            },
            {
                source: '/ios/v2/features/background-modes',
                destination: '/ios/v2/how--to-guides/set-up-video-conferencing/background-modes',
                permanent: true
            },
            {
                source: '/ios/v2/features/callkit',
                destination: '/ios/v2/how--to-guides/set-up-video-conferencing/callkit',
                permanent: true
            },
            {
                source: '/ios/v2/features/chat',
                destination: '/ios/v2/how--to-guides/set-up-video-conferencing/chat',
                permanent: true
            },
            {
                source: '/ios/v2/features/join',
                destination: '/ios/v2/how--to-guides/set-up-video-conferencing/join',
                permanent: true
            },
            {
                source: '/ios/v2/features/leave',
                destination: '/ios/v2/how--to-guides/set-up-video-conferencing/leave',
                permanent: true
            },
            {
                source: '/ios/v2/features/mute',
                destination: '/ios/v2/how--to-guides/set-up-video-conferencing/mute',
                permanent: true
            },
            {
                source: '/ios/v2/features/preview',
                destination: '/ios/v2/how--to-guides/set-up-video-conferencing/preview',
                permanent: true
            },
            {
                source: '/ios/v2/features/render-video',
                destination:
                    '/ios/v2/how--to-guides/set-up-video-conferencing/render-video/overview',
                permanent: true
            },
            {
                source: '/ios/v2/features/pip-mode',
                destination:
                    '/ios/v2/how--to-guides/set-up-video-conferencing/render-video/pip-mode',
                permanent: true
            },
            {
                source: '/ios/v2/advanced-features/simulcast',
                destination:
                    '/ios/v2/how--to-guides/set-up-video-conferencing/render-video/simulcast',
                permanent: true
            },
            {
                source: '/ios/v2/features/screen-share',
                destination: '/ios/v2/how--to-guides/set-up-video-conferencing/screen-share',
                permanent: true
            },
            {
                // https://www.markhneedham.com/blog/2022/07/27/vercel-redirect-wildcards-nested-paths/
                source: '/react-native/v2/guides:path(.*)',
                destination: '/react-native/v2/get-started:path',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/capture-hmsView',
                destination: '/react-native/v2/how--to-guides/capture-frame/capture-hmsView',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/track-settings',
                destination: '/react-native/v2/how--to-guides/interact-with-room/track/',
                permanent: true
            },
            {
                source: '/react-native/v2/features/event-listeners-enums',
                destination: '/react-native/v2/how--to-guides/listen-to-room-updates/',
                permanent: true
            },
            {
                source: '/react-native/v2/features/rtc-stats',
                destination:
                    '/react-native/v2/how--to-guides/measure-network-quality-and-performance/rtc-stats',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/echo-cancellation',
                destination:
                    '/react-native/v2/how--to-guides/configure-your-device/microphone/echo-cancellation',
                permanent: true
            },
            {
                source: '/react-native/v2/features/audio-mode-change',
                destination:
                    '/react-native/v2/how--to-guides/configure-your-device/speaker/audio-mode-change',
                permanent: true
            },
            {
                source: '/react-native/v2/features/audio-output-routing',
                destination:
                    '/react-native/v2/how--to-guides/configure-your-device/speaker/audio-output-routing',
                permanent: true
            },
            {
                source: '/react-native/v2/features/error-handling',
                destination: '/react-native/v2/how--to-guides/debugging/error-handling',
                permanent: true
            },
            {
                source: '/react-native/v2/foundation/faq',
                destination: '/react-native/v2/how--to-guides/debugging/faq',
                permanent: true
            },
            {
                source: '/react-native/v2/features/logger',
                destination: '/react-native/v2/how--to-guides/debugging/logger',
                permanent: true
            },
            {
                source: '/react-native/v2/features/reconnecting-reconnected',
                destination:
                    '/react-native/v2/how--to-guides/handle-interruptions/reconnecting-reconnected',
                permanent: true
            },
            {
                source: '/react-native/v2/features/integration',
                destination: '/react-native/v2/how--to-guides/install-the-sdk/integration',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/change-metadata',
                destination:
                    '/react-native/v2/how--to-guides/interact-with-room/peer/change-metadata',
                permanent: true
            },
            {
                source: '/react-native/v2/features/change-name',
                destination: '/react-native/v2/how--to-guides/interact-with-room/peer/change-name',
                permanent: true
            },
            {
                source: '/react-native/v2/features/change-role',
                destination: '/react-native/v2/how--to-guides/interact-with-room/peer/change-role',
                permanent: true
            },
            {
                source: '/react-native/v2/features/remove-peer',
                destination: '/react-native/v2/how--to-guides/interact-with-room/peer/remove-peer',
                permanent: true
            },
            {
                source: '/react-native/v2/features/end-room',
                destination: '/react-native/v2/how--to-guides/interact-with-room/room/end-room',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/session-metadata',
                destination:
                    '/react-native/v2/how--to-guides/interact-with-room/room/session-metadata',
                permanent: true
            },
            {
                source: '/react-native/v2/features/change-track-state-roles',
                destination:
                    '/react-native/v2/how--to-guides/interact-with-room/track/change-track-state-roles',
                permanent: true
            },
            {
                source: '/react-native/v2/features/playback-allowed',
                destination:
                    '/react-native/v2/how--to-guides/interact-with-room/track/playback-allowed',
                permanent: true
            },
            {
                source: '/react-native/v2/features/change-track-state',
                destination: '/react-native/v2/how--to-guides/interact-with-room/track/remote-mute',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/set-volume',
                destination: '/react-native/v2/how--to-guides/interact-with-room/track/set-volume',
                permanent: true
            },
            {
                source: '/react-native/v2/features/event-listeners',
                destination:
                    '/react-native/v2/how--to-guides/listen-to-room-updates/event-listeners',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/get-methods',
                destination: '/react-native/v2/how--to-guides/listen-to-room-updates/get-methods',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/network-quality',
                destination:
                    '/react-native/v2/how--to-guides/measure-network-quality-and-performance/network-quality',
                permanent: true
            },
            {
                source: '/react-native/v2/features/hls',
                destination: '/react-native/v2/how--to-guides/record-and-live-stream/hls',
                permanent: true
            },
            {
                source: '/react-native/v2/features/recording',
                destination: '/react-native/v2/how--to-guides/record-and-live-stream/recording',
                permanent: true
            },
            {
                source: '/react-native/v2/features/background-handling',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/background-handling',
                permanent: true
            },
            {
                source: '/react-native/v2/features/chat',
                destination: '/react-native/v2/how--to-guides/set-up-video-conferencing/chat',
                permanent: true
            },
            {
                source: '/react-native/v2/features/join',
                destination: '/react-native/v2/how--to-guides/set-up-video-conferencing/join',
                permanent: true
            },
            {
                source: '/react-native/v2/features/leave',
                destination: '/react-native/v2/how--to-guides/set-up-video-conferencing/leave',
                permanent: true
            },
            {
                source: '/react-native/v2/features/audio-share',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/local-audio-share',
                permanent: true
            },
            {
                source: '/react-native/v2/how--to-guides/features/audio-share',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/local-audio-share',
                permanent: true
            },
            {
                source: '/react-native/v2/features/mute',
                destination: '/react-native/v2/how--to-guides/set-up-video-conferencing/mute',
                permanent: true
            },
            {
                source: '/react-native/v2/features/preview',
                destination: '/react-native/v2/how--to-guides/set-up-video-conferencing/preview',
                permanent: true
            },
            {
                source: '/react-native/v2/features/release-resources',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/release-resources',
                permanent: true
            },
            {
                source: '/react-native/v2/features/auto-video-degrade',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/render-video/auto-video-degrade',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/render-video/mini-view',
                permanent: true
            },
            {
                source: '/react-native/v2/features/render-video',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/render-video/overview',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/pip-mode',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/render-video/pip-mode',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/show-audio-level',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/render-video/show-audio-level',
                permanent: true
            },
            {
                source: '/react-native/v2/features/screenshare',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/screenshare',
                permanent: true
            },
            {
                source: '/react-native/v2/advanced-features/strict-privacy-applications',
                destination:
                    '/react-native/v2/how--to-guides/set-up-video-conferencing/strict-privacy-applications',
                permanent: true
            },
            {
                source: '/flutter/v2/how--to-guides/set-up-video-conferencing/render-video/capture-snapshot',
                destination: '/flutter/v2/how--to-guides/capture-frame/capture-snapshot',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/templates-and-roles',
                destination: '/concepts/v2/concepts/templates-and-roles/overview',
                permanent: true
            },
            {
                source: '/server-side/v2/Rooms/:slug',
                destination: '/server-side/v2/api-reference/Rooms/:slug',
                permanent: true
            },
            {
                source: '/server-side/v2/active-rooms/:slug',
                destination: '/server-side/v2/api-reference/active-rooms/:slug',
                permanent: true
            },
            {
                source: '/server-side/v2/Sessions/:slug',
                destination: '/server-side/v2/api-reference/Sessions/:slug',
                permanent: true
            },
            {
                source: '/server-side/v2/policy/:slug',
                destination: '/server-side/v2/api-reference/policy/:slug',
                permanent: true
            },
            {
                source: '/server-side/v2/Destinations/:slug',
                destination: '/server-side/v2/api-reference/Destinations/:slug',
                permanent: true
            },
            {
                source: '/server-side/v2/legacy-api(.*)/:slug',
                destination: '/server-side/v2/api-reference/legacy-api-v1/:slug',
                permanent: true
            },
            {
                source: '/server-side/v2/introduction/basics',
                destination: '/concepts/v2/concepts/basics',
                permanent: true
            },
            {
                source: '/server-side/v2/introduction/request-and-response',
                destination: '/server-side/v2/how--to-guides/make-api-calls',
                permanent: true
            },
            {
                source: '/server-side/v2/introduction/authentication-and-tokens',
                destination: '/concepts/v2/concepts/security-and-tokens',
                permanent: true
            },
            {
                source: '/server-side/v2/introduction/webhook',
                destination: '/server-side/v2/how--to-guides/configure-webhooks/overview',
                permanent: true
            },
            {
                source: '/server-side/v2/introduction/postman-guide',
                destination: '/server-side/v2/how--to-guides/set-up-postman',
                permanent: true
            },
            {
                source: '/server-side/v2/introduction/recordings',
                destination: '/concepts/v2/concepts/recordings',
                permanent: true
            },
            {
                source: '/server-side/v2/introduction/faq',
                destination: '/javascript/v2/how--to-guides/debugging/faq',
                permanent: true
            },
            {
                source: '/server-side/v2/api-reference/Destinations/recording',
                destination: '/server-side/v2/api-reference/legacy-api-v1/destinations/recording',
                permanent: true
            },
            {
                source: '/server-side/v2/api-reference/Destinations/rtmp-streaming-and-browser-recording',
                destination:
                    '/server-side/v2/api-reference/legacy-api-v1/destinations/rtmp-streaming-and-browser-recording',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/basics',
                destination: '/get-started/v2/get-started/concepts/basics',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/templates-and-roles/overview',
                destination: '/get-started/v2/get-started/concepts/templates-and-roles',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/recordings',
                destination: '/get-started/v2/get-started/features/recordings',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/live-streaming',
                destination: '/get-started/v2/get-started/features/live-streaming',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/templates-and-roles/breakout-rooms',
                destination:
                    '/get-started/v2/get-started/features/interaction-and-controls/breakout-rooms',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/templates-and-roles/waiting-room',
                destination:
                    'get-started/v2/get-started/features/interaction-and-controls/waiting-room',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/adaptive-bitrate',
                destination: '/get-started/v2/get-started/features/quality/adaptive-bitrate',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/handling-audio-video-edge-cases',
                destination:
                    '/get-started/v2/get-started/features/quality/handling-audio-video-edge-cases',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/prebuilt',
                destination: '/get-started/v2/get-started/prebuilt/prebuilt',
                permanent: true
            },

            {
                source: '/concepts/v2/concepts/rooms/room-codes/room-codes',
                destination: '/get-started/v2/get-started/prebuilt/room-codes/overview',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/rooms/room-codes/room-code-auth',
                destination: '/get-started/v2/get-started/prebuilt/room-codes/room-code-auth',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/rooms/room-links',
                destination: '/get-started/v2/get-started/prebuilt/room-codes/room-links',
                permanent: true
            },
            {
                source: '/concepts/v2/concepts/security-and-tokens',
                destination: '/get-started/v2/get-started/security-and-tokens',
                permanent: true
            },
            { source: '/concepts/:slug*', destination: '/get-started/:slug*', permanent: true },
            {
                source: '/ios/v2/get-started/:slug*',
                destination: '/ios/v2/quickstart/:slug*',
                permanent: true
            },
            {
                source: '/android/v2/get-started/:slug*',
                destination: '/android/v2/quickstart/:slug*',
                permanent: true
            },
            {
                source: '/javascript/v2/get-started/:slug*',
                destination: '/javascript/v2/quickstart/:slug*',
                permanent: true
            },
            {
                source: '/flutter/v2/get-started/:slug*',
                destination: '/flutter/v2/quickstart/:slug*',
                permanent: true
            },
            {
                source: '/react-native/v2/get-started/:slug*',
                destination: '/react-native/v2/quickstart/:slug*',
                permanent: true
            },
            {
                source: '/react-native/v2/how-to-guides/handle-interruptions/release-resources',
                destination:
                    '/react-native/v2/how-to-guides/set-up-video-conferencing/release-resources',
                permanent: true
            },
            {
                source: '/react-native/v2/how-to-guides/handle-interruptions/error-handling',
                destination: '/react-native/v2/how-to-guides/debugging/error-handling',
                permanent: true
            },
            {
                source: '/server-side/v2/how-to-guides/active-rooms/:slug*',
                destination: '/server-side/v2/api-reference/active-rooms/:slug*',
                permanent: true
            },
            {
                source: '/:slug*/how--to-guides/:path*',
                destination: '/:slug*/how-to-guides/:path*',
                permanent: true
            }
        ];
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

module.exports = nextConfig;
