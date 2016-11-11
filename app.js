'use strict';
const koa = require('koa');
const route = require('koa-route');
const mongoose=require('mongoose');
const errorHandleMiddle=require('./util/error');
const config=require('./config/env');
const app = koa();

const host='127.0.0.1';
const db=mongoose.connect(`mongodb://${host}:27017/autoSubmitMailWork`);

//mongodb promise style
mongoose.Promise=require('bluebird');



//error handle middleware
app.use(errorHandleMiddle());

//koa config
require('./config/koa')(app);

//route
require('./router')(app);

//错误监听
app.on('error',(err,ctx)=>{
  if (process.env.NODE_ENV != 'test') {
  console.error('error', err);
}
});


if (!module.parent) {
  app.listen(config.port);
  console.log(`listening on port ${config.port}`);
}

module.exports = app;
