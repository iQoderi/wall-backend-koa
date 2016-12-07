/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');

let UserSchema = new Schema({
  id: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  nickname: {
    required: true,
    type: String,
    default: ''
  },
  password: {
    required: true,
    type: String
  },
  isActive: {
    required: true,
    type: Number,
    default: 0     //0 激活  //1 没有激活
  },
  isBlock: {
    required: true,
    type: Number,
    default: 0    //0 拉黑  1没有拉黑
  },
  token: {
    createAt: String,
    token: {
      type: String,
      default: md5(Date.now() + Math.random() * 100000)
    },
    expiresIn: String
  }
});


module.exports = mongoose.model('User', UserSchema);
