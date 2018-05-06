const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const webpack = require('webpack');

const config = require('./webpack.config');
const compiler = webpack(config);
const fsp = require('fs.promised');
const fs = require('fs');
const app = new Koa();
const router = new Router();

const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');
const compose = require('koa-compose');

const webpackDevOptions = {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    watchOptions: {
        ignored: /node_modules/,
    },
    // noInfo: false,
    // reload: true,
    // stats: {
    //   assets: false,
    //   colors: true,
    //   version: false,
    //   hash: false,
    //   timings: false,
    //   chunks: false,
    //   chunkModules: false
    // },

    headers: {
      'Access-Control-Allow-Origin': '*'
    }
};

// 执行2遍，是因为执行2遍compiler

const devM = async function (ctx, next) {
  console.log('devM1');
  webpackDevMiddleware(compiler, webpackDevOptions);
  await next();
  console.log('devM2');
};


const hotM = async function (ctx, next) {
  console.log('hotM1');
  webpackHotMiddleware(compiler,{
   log: false,
   heartbeat: 2000,
  });
  await next();
  console.log('hotM2');
};


// const main = async function (ctx, next) {
//   console.log('main1');
  
//   ctx.response.type = 'html';

//   ctx.response.body = fs.readFileSync('./client/index.html');
//   next();

// };


const middlewares = compose([devM, hotM]);
app.use(middlewares);

let devMiddleware = webpackDevMiddleware(compiler, webpackDevOptions);

let hotMiddleware = webpackHotMiddleware(compiler,{
   log: false,
   heartbeat: 2000,
});
/*
log - 用于记录行的函数，传递false到禁用。默认为console.log
path - 中间件将服务事件流的路径必须与客户端设置相匹配
heartbeat - 多长时间将心跳更新发送到客户端以保持连接的活动。应小于客户的timeout设置 - 通常设置为其一半值。
*/
// app.use(devMiddleware);

// app.use(hotMiddleware);


router.get('/',(ctx, next)=>{
    ctx.type = 'html';
    ctx.body = fs.readFileSync('./client/index.html');
});

router.get('/tmp/*',(ctx, next)=>{
    ctx.body = fs.readFileSync('./tmp/index.js');
});


app.use(router.routes())
   // .use(router.allowedMethods());



app.listen(9000, 'localhost', err => {
  if (err) {
    console.log('err'+err);
    return;
  }
  console.log('Listening at http://localhost:9000');
});

