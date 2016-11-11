/**
 * Created by qoder on 16-10-11.
 */
'use strict';

const mongoose=require('mongoose');
const userModel=require('../../models/user.model');
const User=mongoose.model('User');

/**
 * 获取用户信息
 */
exports.getUserInfo=function *() {
  const user={
    id:this.user.id,
    username:this.user.username
  };
  this.body={
    code:0,
    data:{
      user:user
    }
  }
};

/**
 * 删除用户
 */
exports.rmUser=function *() {
  const condition={id:this.parmas.id};
  const user=User.delete(condition);
};
