/**
 * Created by qoder on 16-10-11.
 */
'use strict';

const mongoose=require('mongoose');
const userModel=require('../models/user.model.js');
const User=mongoose.model('User');

function *checkToken(next) {
  const token=this.request.header.token||this.query.token;
  const condition={
    "token.token":token
  };
  const user=yield User.findOne(condition);
  if(user){
    const now=Date.now();
    if(now<=user.token.expiresIn){
      this.user=user;
      yield next;
    }else{
      this.body={
        code:10006
      }
    }
  }else{
    this.body={
      code:10008
    }
  }
}

module.exports=checkToken;
