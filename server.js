const path = require('path');
const Koa = require('koa');
const logger = require('koa-logger');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const webpack = require('webpack');
const config = require('./webpack.config');
const compiler = webpack(config);
const fsp = require('fs.promised');
const fs = require('fs');
const app = new Koa();
const router = new Router();

const compose = require('koa-compose');
const webpackMiddleware = require('koa-webpack');

const webpackDevOptions = {
  noInfo: true,
  historyApiFallback: true,
  publicPath: config.output.publicPath,
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};

app.use(logger());

app.use(bodyParser());
// 提示：'webpack-hot-client: `entry` Object values must be an Array or Function. Please check your webpack config.'
// 同时执行了npm run prod，这样就不需要启动2次
app.use(webpackMiddleware({
  compiler: compiler,
  config: config,
  dev: webpackDevOptions,
  hot: compiler
}));


router.get('/',(ctx, next)=>{
    ctx.type = 'html';
    ctx.body = fs.readFileSync('./client/index.html');
});

router.get('/tmp/*',(ctx, next)=>{
    ctx.body = fs.readFileSync('./tmp/index.js');
});


app.use(router.routes())
   .use(router.allowedMethods());

app.listen(9000, 'localhost', err => {
  if (err) {
    console.log('err'+err);
    return;
  }
  console.log('Listening at http://localhost:9000');
});
