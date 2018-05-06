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

const hot = require('webpack-hot-middleware');
const dev = require('webpack-dev-middleware');
const compose = require('koa-compose');

const webpackDevOptions = {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },

    headers: {
      'Access-Control-Allow-Origin': '*'
    }
};

const devM = async function (ctx, next) {
  console.log('devM1');
  dev(compiler, webpackDevOptions);
  next();
  console.log('devM2');
};

let data1 = '';
const hotM = async function (ctx, next) {
  console.log('hotM1');
  hot(compiler);
  next();
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

