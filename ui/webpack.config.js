const path = require('path');

const webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractPlugin = new ExtractTextPlugin(
    {
        filename:'css/app.bundle.css'
    }
)

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
        'app.bundle':'static/js/index.js',
        'app.login':'static/js/login'
    },
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'js/[name].js',
        publicPath : '../'
    },
    devtool:'inline-source-map',
    module : {
        rules : [
            {
                test : /\.js$/,
                exclude:/node_modules/,
                use : [
                    {
                        loader:'babel-loader',
                        options:{
                            presets : ['babel-preset-env']
                        }
                    }
                ],
                exclude : path.resolve(__dirname,'node_modules'),
            },
            {
                test:/\.(s)*css$/,
                use : extractPlugin.extract({
                    use:['css-loader', 'sass-loader']
                })
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
        extractPlugin,
        provideLib
    ],
    resolve: {
        modules:[__dirname, "node_modules"],
        alias:{
            'static':'static',
            'sources':'static/js',
            'common':'common',
            'tools':'tools',
            'rest_caller':'static/js/rest_caller.js',
        }
    }
 }