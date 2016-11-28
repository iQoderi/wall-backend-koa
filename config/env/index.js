/**
 * Created by qoder on 16-10-11.
 */
'use strict';

const all={
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9000,
  //mongodb配置
  mongo: {
    host:'127.0.0.1',
    options: {
      user: 'root',
      pass:'Qoder5143209'
    }
  },
  email:'neuqstbysgl@163.com',
  host:'http://10.17.0.147:9000',
  //md5加密盐
  salt:'qoder123',
  //token生成 secret,
  tokenSecret:'qoder456'
};

module.exports = all;
