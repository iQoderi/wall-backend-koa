/**
 * Created by qoder on 16-10-11.
 */
'use strict';

const mongoose=require('mongoose');
const userModel=require('../../models/user.model');
const hash=require('../../util/hash');
const User=mongoose.model('User');

/**
 * 获取用户信息
 */
exports.getUserInfo=function *() {
  const user={
    id:this.user.id,
    email:this.user.email,
    nickname:this.user.nickname
  };
  this.body={
    code:0,
    data:{
      user:user
    }
  }
}

/**
 * 用户修改密码
 */
exports.resetPass=function *() {
  const body=this.request.body;
  const user=this.user;
  body.oldPassword=hash(user.email,body.oldPassword);
  if(user.password!==body.oldPassword){
    this.body={code:10009}
  }else{
    const password=hash(user.email,body.password);
    const condition={id:user.id};
    const update={password:password}
    const result=yield  User.update(condition,update);
    if(result.ok!=0){
      this.body={code:0}
    }else{
      this.body={code:10010}
    }
  }
}
