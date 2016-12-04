/**
 * Created by qoder on 16-12-4.
 */
'use strict';
const mongoose=require('mongoose');
const Schema = mongoose.Schema;

let wallSchema=new Schema({
  id:{
    required:true,
    type:String
  },
  userId:{
    required:true,
    type:String
  },
  content:{
    required:true,
    type:String
  }
})

module.exports=mongoose.model('Wall',wallSchema);
