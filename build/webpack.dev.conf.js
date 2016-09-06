var webpack = require('webpack');
var config = require('./webpack.base.conf');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

config.devtool = 'source-map';

// add hot-reload related code to entry chunk
config.entry.app = [
	'eventsource-polyfill',
	'webpack-hot-middleware/client?quiet=true&reload=true',
	config.entry.app
];

/*这里必须是服务器的绝对跳径，否则不能访问*/
config.output.publicPath = 'http://localhost:9000/';

/*插件设置*/
config.plugins = (config.plugins || []).concat([

new webpack.optimize.OccurenceOrderPlugin(),

new webpack.HotModuleReplacementPlugin(),

new webpack.NoErrorsPlugin(),

/*路径真是日了*/
new HtmlWebpackPlugin({
	hash: true,
	filename: 'html/app.html',
	template: __dirname + '/../src/html/app.html',
	chunks: ['app'],
	inject: false
}),

new HtmlWebpackPlugin({
	hash: true,
	filename: 'html/index.html',
	template: __dirname + '/../src/html/index.html',
	chunks: ['index'],
	inject: false
}),

/*抽取样式合并组*/
new ExtractTextPlugin('css/[name].css'),

/*BrowserSync options*/
new BrowserSyncPlugin({
	host: '127.0.0.1',
	port: 9000,
	startPath: 'html/index.html',
    open: 'local',
	proxy: 'http://127.0.0.1:8000/',
	ghostMode: false,
	logConnections: false,
	notify: false
},{
	reload: true
})]);

module.exports = config;
