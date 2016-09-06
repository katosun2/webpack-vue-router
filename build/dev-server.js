var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.dev.conf');
/*var favicon = require('express-favicon')*/

var app = express();
var compiler = webpack(config);

/*设置资源目录*/
app.use('/', express.static(path.join(__dirname, '../__dist__')));

/*app.use(favicon(path.join(__dirname, '../favicon.ico')))*/
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
// 启动服务的时候 打包并监听客户端用到的文件，webpackDevMiddleware是开发模式，他会打包js在内存里面,你改了文件，它也会重新打包 
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {  
	  colors: true  
  } 
}));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));

app.listen(8000, '127.0.0.1', function(err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://127.0.0.1:8000');
});

/*watch options:*/
compiler.watch({
	aggregateTimeout: 300,
	poll: 1000
},
function(err, stats) {
	if (err) {
		throw err;
	}

	console.log(stats.toString({
		children: false,
		chunks: false,
		colors: true
	}));
});
