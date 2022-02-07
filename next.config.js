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
    async redirects () {
        return [
          {
            source: '/about',
            destination: '/docs',
            permanent: true,
          },
        ]
    }
};

module.exports = nextConfig;