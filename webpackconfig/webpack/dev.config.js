const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'bootstrap-loader',
        'webpack-hot-middleware/client',
        './src/index',
    ],
    output: {
        publicPath: '/dist/',
    },

    /* module: {
     loaders: [{
     test: /\.css$/,
     loader: 'style!css?localIdentName=[path][name]--[local]!postcss-loader!sass',
     }],
     },
     */
    module: {
        loaders: [{test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader')},]
    },
    resolve:       {
        extensions:         ['', '.js', '.jsx', '.css'],
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
            __DEVELOPMENT__: true,
        }),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
        }),
    ],
};
