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

        config.module.rules.push({
            test: /\.md$/,
            use: 'raw-loader'
        });

        return config;
    }
};
