/**
 * Created by qoder on 16-10-11.
 */
'use strict';

const all={
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9000,
  //mongodb配置
  mongo: {
    options: {
      user: process.env.MONGO_USERNAME || '',
      pass: process.env.MONGO_PASSWORD || ''
    }
  },
  //md5加密盐
  salt:'qoder123',
  //token生成 secret,
  tokenSecret:'qoder456'
};

module.exports = all;
