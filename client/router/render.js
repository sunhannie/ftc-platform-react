var app = require('koa')();
var router = require('koa-router')();


const indexRoute = (router)=>{
  router.get('/',(ctx, next)=>{
    ctx.body = render('index',{
      title : 'Koa2 Test!'
    });
  });

  router.get('/user',(ctx, next)=>{
    ctx.body = render('user',{
      title : 'User Test!'
    });
  });
}
module.exports = indexRoute;