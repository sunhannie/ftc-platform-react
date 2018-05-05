const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const webpack = require('webpack');

const config = require('./webpack.config');
const compiler = webpack(config);
const fsp = require('fs.promised');
const fs = require('fs');
const app = new Koa();
// const router = new Router();

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




const main = async function (ctx, next) {
  console.log('main1');
  
  ctx.response.type = 'html';
  // ctx.response.body = 'hello world';
  // ctx.response.body = fs.readFile('./client/index.html');
  // next();
  // fs.readFile('./client/index.html','utf8', (err,data)=>{
  //   if(err){
  //     console.log('main err'+err);
    
  //   }else{
  //     console.log('main2');
  //     data1 = data;

  //   }
  // });
  ctx.response.body = fs.readFileSync('./client/index.html');


 
  // ctx.response.body = await fsp.readFile('./client/index.html', 'utf8');  //加上它会先执行hotM2，再执行main2
  
  
};
app.use(devM);
app.use(hotM);
app.use(main);

// const middlewares = compose([devM, hotM, main]);
// app.use(middlewares);

app.listen(9000, 'localhost', err => {
  if (err) {
    console.log('err'+err);
    return;
  }
  console.log('Listening at http://localhost:9000');
});





  // fs.readFile('index.html', (err,data)=>{
  //   if(err){
      
  //   }else{
  //     ctx.response.body = data
  //   }
  // })