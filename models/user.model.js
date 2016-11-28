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
  password: {
    required: true,
    type: String
  },
  token: {
    createAt: String,
    token: String,
    expiresIn: String
  }
});


module.exports = mongoose.model('User', UserSchema);
