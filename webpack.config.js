const path = require('path'); //Предоставляет утилиты для работы с путями
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'; //Определяем режимы сборки
const isDev = !isProd

const fileName = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;

const jsLoader = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    ];

    if (isDev)
        loaders.push('eslint-loader')

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'), //Корневая папка для файлов проекта
    mode: 'development', //Режим работы проекта по умолчанию - разработка
    entry: ['@babel/polyfill', './index.js'], //Точка входа,
    output: {
        // filename: 'bundle.[hash].js',
        filename: fileName('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core')
        }
    },
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }), //Какой-то плагин для html
        // //Плагин для копирования favicon
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                },
            ],
        }),
        //Плагин очистки диста
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: fileName('css'),
            // filename: 'bundle.[hash].css',
            // chunkFilename: '[id].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        }
                    },
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoader()
            }
        ],
    },
};
