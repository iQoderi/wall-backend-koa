/**
 * Created by qoder on 16-11-29.
 */
'use strict';
const router = require('koa-router')();
const controller = require('./admin.controller');
const hashPassword=require('../../middlewares/hashPassword.middleware')
const checkToken = require('../../middlewares/checkToken');

router.post('/login', hashPassword,controller.login);

module.exports = router;
