/**
 * Created by qoder on 16-12-4.
 */
'use strict';
const mongoose=require('mongoose');
const adminModel=require('../models/admin.model');
const Admin=mongoose.model('Admin');

function *checkAdminToken(next) {
  const token=this.request.header.token||this.query.token;
  const condition={
    "token.token":token
  }

  const user=yield Admin.findOne(condition);
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

module.exports=checkAdminToken;
