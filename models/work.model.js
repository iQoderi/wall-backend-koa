/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let workSchema = new Schema({
  accountId: {
    type: String,
    required: true
  },
  mailId: String,
  belongTo: {
    type: String,
    required: true
  },
  sendTo: {
    type: String,
    required: true
  },
  lesson: {
    type: String,
    required: true
  },
  times: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createAt: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Work', workSchema);
