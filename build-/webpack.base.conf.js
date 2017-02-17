var path = require("path");
var fs = require("fs");
var webpack = require('webpack');
var vue = require("vue-loader");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

/*获取全部页面入口文件*/
var entryPath = __dirname + '/../src/pages/',
entris = fs.readdirSync(entryPath).reduce(function (o, filename) {
	if( /\.js$/.test(filename)){
		if(!/\./.test(filename)){
			o[path.join(filename, filename).split(/\.js/)[0]] = path.join(entryPath, filename, filename + '.js');
		}else{
			o[filename.split(/\.js/)[0]] = path.join(entryPath, filename);
		}
	}

    return o;
  }, {}
);

module.exports = {
	/*表示入口文件*/
	cache: true,
	minimize: true,
	devtool: 'source-map',
	entry: entris,
	/*表示输出文件*/
	output: {
		/*编译好的文件目录*/
		path: path.join(__dirname, "/../dist"),
		filename: 'js/[name].js',
		/*chunkFilename: "js/[name].[chunkhash].js",*/
		/*sourceMapFilename: 'js/[file].map',*/
		/*引用你的文件时考虑使用的地址,用绝对地址最好，注意影响文件路径提取*/
		/*TODO 以最终使用的页面路径为基准， 这里为dist/html*/
		/*publicPath: "http://localhost:8080/src/dist/"*/
		publicPath: "../"
	},
	/*表示这个依赖项是外部lib，遇到require它不需要编译，*/
	/*且在浏览器端对应window.jQuery*/
	externals: [
		/*'vue': 'window.Vue',*/
		(function () {
			var IGNORES = [
				//'lei-download',
				//'fs',
				//'path',
				//'electron'
			];
			return function (context, request, callback) {
				if (IGNORES.indexOf(request) >= 0) {
					return callback(null, "require('" + request + "')");
				}
				return callback();
			};
		})()
	],

	resolveLoader: {
		root: path.join(__dirname, '../node_modules'),
	},

	module: {
		loaders: [{
			test: /\.vue$/i,
			loader: 'vue'
		},{
			test: /\.js$/,
			loader: 'babel',
			exclude: /node_modules/
		}, {
			test: /\.scss$/i,
			loader: "style!css!sass"
		/*}, {*/
			//test: /\.(png|jpe?g|gif)/i,
			/*1024 = 1kb*/
			//loader: 'url?limit=8192&name=img/[name].[ext]'
		//}, {
			//test: /\.(woff2?|otf|eot|svg|ttf)/i,
			/*1024 = 1kb*/
			//loader: 'url?limit=10240&name=fonts/[name].[ext]'
		}]
	},
	vue: {
		loaders: {
			js: 'babel',
			/*合并组件样式*/
			sass: ExtractTextPlugin.extract('css!sass'),
			css: ExtractTextPlugin.extract('css')
		}
	},
	resolve: {
		/*查找module的话从这里开始查找, 绝对路径*/
		/*root: __dirname + '/app',*/
		/*现在可以写 require('file') 代替 require('file.vue')*/
		extensions: ['', '.vue', '.json', '.js'],
		/*模块别名定义，方便后续直接引用别名，无须多写长长的地址*/
		alias: {
			/*后续直接 require('AppStore') 即可*/
			/*AppStore : 'js/stores/AppStores.js'*/
		},
		modulesDirectories: ['node_modules']
	},
	plugins: [
		/*环境判断*/
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
		/*new webpack.optimize.UglifyJsPlugin()*/
		/*抽取样式合并组*/
		/*new ExtractTextPlugin('css/[name].css')*/
	]
};
