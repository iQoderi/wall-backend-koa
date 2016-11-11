/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const router=require('koa-router')();
const controller=require('./auth.controller');

router.post('/login',controller.login);
router.post('/register',controller.register);

module.exports=router;
