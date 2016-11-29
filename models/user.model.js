/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
  token: {
    createAt: String,
    token: String,
    expiresIn: String
  }
});


module.exports = mongoose.model('User', UserSchema);
