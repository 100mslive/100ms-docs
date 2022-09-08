/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    basePath: '/docs',
    experimental: {
        optimizeCss: true
    },
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
            }
        ];
    }
};

module.exports = nextConfig;
