const webpack = require('webpack');
const path = require('path');
const package = require('./package.json');

module.exports = (env) => {
    env = env || {};
    return {
        context: __dirname + '',
        performance: {
            hints: 'warning'
        },
        entry: {
            [env.min ? 'umd.min' : 'umd']: path.resolve(__dirname, './src/index.ts')
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            library: package.name,
            libraryTarget: 'umd',
            filename: '[name].js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.webpack.js', '.web.js', '.ts', '.js'],
            alias: {},
            modules: [
                'node_modules',
                path.resolve(__dirname, './node_modules')
            ]
        },
        plugins: [
            new webpack.LoaderOptionsPlugin({
                options: {
                    tslint: {
                        emitErrors: true,
                        failOnHint: false
                    }
                }
            }),
            (
                env.min
                    ? new webpack.optimize.UglifyJsPlugin({
                        sourceMap: true
                    })
                    : null
            )
        ].filter(v => !!v),
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.tsx?$/,
                    loader: 'tslint-loader'
                },
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader'
                }
            ]
        }
    }
};
