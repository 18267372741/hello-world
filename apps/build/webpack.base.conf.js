var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var bootstrapPath = path.join(__dirname, '../node_modules/bootstrap/dist/css')
var bootstrapPathJ = path.join(__dirname, '../node_modules/bootstrap/dist/js')
var daterangepicker = path.join(__dirname, '../node_modules/daterangepicker')
var qrCode = path.join(__dirname, '../node_modules/qrcode-npm')
var qiniu = path.join(__dirname, '../node_modules/qiniu-js/dist')

module.exports = {
    entry: {
        photoStudio: "./src/photoStudio.js",
        workRoom: "./src/workRoom.js",
        repairDivision: "./src/repairDivision.js",
        backstage: "./src/backstage.js"
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components')
        },
        modulesDirectories: ['node_modules', bootstrapPath, bootstrapPathJ, daterangepicker, qrCode, qiniu]
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    externals: {
        'plupload': true
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                include: projectRoot,
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.html$/,
                loader: 'vue-html'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: path.join(__dirname, '../node_modules/jquery/dist/jquery.min'),
                loader: 'expose?jQuery'
            }
        ]
    },
    vue: {
        loaders: utils.cssLoaders()
    }
};
