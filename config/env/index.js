/**
 * Created by qoder on 16-10-11.
 */
'use strict';

const all={
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9000,
  //mongodb配置
  mongo: {
    host:process.env.NODE_ENV!=='dev'?'123.206.16.40':'127.0.0.1',
    options: {
      user: 'qoder',
      pass:'qoder2016'
    }
  },
  email:'neuqstbysgl@163.com',
  host:process.env.NODE_ENV!=='dev'?'http://api.wall.qoder.cn':'http://127.0.0.1:9000',
  //md5加密盐
  salt:'qoder123',
  //token生成 secret,
  tokenSecret:'qoder456'
};

module.exports = all;
