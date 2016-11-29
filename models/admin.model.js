/**
 * Created by qoder on 16-11-29.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema=new Schema({
  id:{
    required:true,
    type:String
  },
  email:{
    required:true,
    type:String
  },
  password:{
    required:true,
    type:String
  }
})

module.exports=mongoose.model('Admin',adminSchema);
