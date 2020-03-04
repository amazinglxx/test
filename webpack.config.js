const path = require("path");
const webpack = require("webpack");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
//是产生在内存的页面
//html-webpack-plugin 1,在内存的页面 2,将打包好的js自动加在内存的页面中
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports={
	entry:{
		path:path.join(__dirname,"./src/main.js")
	},
	output:{
		path:path.join(__dirname,"./dist"),
		filename:"bundle.js"
	},
	devServer:{  //和package.json配置的自动打开
		open:true,
		port:8080,
		contentBase:"src",
		hot:true
	},
	module:{
		rules:[
			{
				test:/\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test:/\.less$/,
				use:['style-loader', 'css-loader','less-loader']
			},
			{
				test:/\.scss/,
				use:['style-loader', 'css-loader','sass-loader']
			},
			{
				test:/\.(jpg|jpeg|png|webp|bmp|gif)$/,
				use:'url-loader?limit=736&name=[hash:8]-[name].[ext]'
			},
			{
				test:/\.(tff|eot|svg|woff|woff2)$/,
				use:'url-loader'
			},
			{
				test:/\.js$/,
				use:'babel-loader',
				exclude: /node_modules/
			},
			{ 
				test: /\.vue$/,
				use: "vue-loader" ,
		    }
			
		]
	},	
	plugins:[
		new webpack.HotModuleReplacementPlugin(),  //热更新插件在webpack中
		new htmlWebpackPlugin({
			template:path.join(__dirname,"./src/index.html"),
			filename:"index.html"
		}),
		new VueLoaderPlugin()
	],
	resolve:{
		alias:{
			"vue$":"vue/dist/vue.js"
		}
	}
}