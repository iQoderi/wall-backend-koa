/**
 * Created by qoder on 16-11-29.
 */
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new Schema({
  id: {
    required: true,
    type: String
  },
  adminId: {
    required: true,
    type: String
  },
  email: {
    required: true,
    type: String
  },
  role: {
    required: true,
    type: Number,
    default: 0      //0 subAdmin //1  Admin
  },
  password: {
    required: true,
    type: String
  }
})

module.exports = mongoose.model('Admin', adminSchema);
