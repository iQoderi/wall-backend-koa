/**
 * Created by qoder on 16-10-11.
 */
'use strict';

const router=require('koa-router')();
const controller=require('./user.controller');
const checkToken=require('../../util/token/checkToken');

router.use(checkToken);
router.get('/info',controller.getUserInfo);

module.exports=router;
