const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');
const path = require('path');

module.exports = override(
    addWebpackAlias({
        zlib: require.resolve('browserify-zlib'),
        buffer: require.resolve('buffer'),
        path: require.resolve('path-browserify'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        assert: require.resolve('assert/'),
        fs: require.resolve('browserify-fs'),
        net: require.resolve('net-browserify'),
        querystring: require.resolve('querystring-es3'),
        url: require.resolve('url/'),
        util: require.resolve('util/'),
    }),
    addWebpackPlugin(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    )

);
