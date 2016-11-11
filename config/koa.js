/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const path=require('path');
const responseTime=require('koa-response-time');
const logger=require('koa-logger');
const json=require('koa-json');
const compress=require('koa-compress');
const bodyParser=require('koa-bodyparser');
const serve=require('koa-static');
const cors=require('koa-cors');
// const passport=require('koa-passport');

module.exports=function (app) {
  app.use(responseTime());
  app.use(logger());
  app.use(cors({
    origin:true,
    credentials:true
  }));
  app.use(serve(path.join(__dirname, '/../public')));
  app.use(bodyParser());
  app.use(json());
  app.use(compress());
};

