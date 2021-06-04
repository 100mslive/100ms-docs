// const withMDX = require('@next/mdx')({
//     extension: /\.mdx?$/
// });

// module.exports = withMDX({
//     pageExtensions: ['mdx', 'tsx']
// });

module.exports = {
    webpack: (config, { isServer, dev }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            config.node = {
                fs: 'empty'
            };
        }

        // Replace React with Preact only in client production build
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: 'preact/compat',
                'react-dom/test-utils': 'preact/test-utils',
                'react-dom': 'preact/compat'
            });
        }

        return config;
    }
};
