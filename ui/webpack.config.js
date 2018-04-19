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
    _:'underscore'
})

module.exports = {
    entry : ['./index.js'],
    output : {
        path : path.resolve(__dirname,'dist'),
        filename : 'js/app.bundle.js',
        publicPath : '../'
    },
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
                test:/\.css$/,
                use : extractPlugin.extract({
                    use:['css-loader']
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
                test:/\.scss$/,
                use : extractPlugin.extract({
                    use:['css-loader','scss-loader']
                })
            },{
                test:/\.(html|htm|txt)$/,
                use :'raw-loader'
            }
        ]
    },
    plugins :[
        extractPlugin,
        provideLib
    ]
 }