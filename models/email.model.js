/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  stuCode: {
    type: String,
    required: true
  },
  belongTo: {     //属于某个用户,
    type: String,
    required: true
  },
  accountId: {
    type: String,
    required: true
  },
  email: {
    type: String,
    lowercase: true,
    required: true
  },
  pass: String
});

module.exports = mongoose.model('Email', emailSchema);
