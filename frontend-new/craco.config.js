const CracoAlias = require("craco-alias");
const webpack = require("webpack");

module.exports = {
    webpack: {
        configure: (webpackConfig, { env }) => {
            // Production optimizations
            if (env === 'production') {
                // Disable source maps
                webpackConfig.devtool = false;

                // Split chunks for better caching
                webpackConfig.optimization = {
                    ...webpackConfig.optimization,
                    splitChunks: {
                        chunks: 'all',
                        cacheGroups: {
                            vendor: {
                                test: /[\\/]node_modules[\\/]/,
                                name(module) {
                                    const packageName = module.context.match(
                                        /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                    )[1];
                                    return `vendor.${packageName.replace('@', '')}`;
                                },
                                priority: 10,
                            },
                            common: {
                                minChunks: 2,
                                priority: 5,
                                reuseExistingChunk: true,
                            },
                        },
                    },
                    runtimeChunk: 'single',
                };

                // Minimize bundle size
                webpackConfig.performance = {
                    maxAssetSize: 512000,
                    maxEntrypointSize: 512000,
                    hints: 'warning',
                };
            }

            return webpackConfig;
        },
    },
};
