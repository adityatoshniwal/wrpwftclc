const path = require('path');

const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

var miniCssExtractPlugin = new MiniCssExtractPlugin(
    {
        filename:'css/app.bundle.css'
    }
);

var provideLib = new webpack.ProvidePlugin({
    $:'jquery',
    jQuery:'jquery',
    'window.jQuery':'jquery',
    Backbone:'backbone',
    _:'underscore',
    alertify:'alertifyjs',
})

module.exports = {
    entry : {
        'app.bundle':'index.js',
        // 'app.login':'login/login'
    },
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'js/[name].js',
        publicPath : '../'
    },
    devtool:'inline-source-map',
    optimization:{
        minimize: false,
    },
    module : {
        rules : [
            {
                test : /\.jsx?$/,
                exclude:/node_modules/,
                use : [
                    {
                        loader:'babel-loader',
                        options:{
                            presets : ['env', 'react'],
                            plugins: ['transform-object-rest-spread']
                        }
                    }
                ],
                exclude : path.resolve(__dirname,'node_modules'),
            },
            {
                test:/\.(s)*css$/,
                use : [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test:/\.(woff|ttf|svg|otf|eot|woff2)(\?\S*)?$/,
                    use:[
                        {
                            loader:'file-loader',
                            options:{
                                name:'fonts/iconpack.[ext]'
                            }
                        }
                    ]
            },{
                test:/\.(html|htm|txt)$/,
                use :'raw-loader'
            },{
                test:/\.(png|gif|jpg)$/,
                use :'url-loader'
            }

        ]
    },
    plugins :[
        miniCssExtractPlugin,
        provideLib
    ],
    resolve: {
        modules:[__dirname, "node_modules"],
        extensions: ['.js', '.jsx'],
        alias:{
            'static': path.resolve(__dirname,'./static/'),
            'sources':path.resolve(__dirname,'./'),
            'common':path.resolve(__dirname,'common/'),
            'tools': path.resolve(__dirname,'tools/'),
            'rest_caller': path.resolve(__dirname,'static/js/rest_caller.js'),
        }
    }
 }