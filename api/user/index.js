/**
 * Created by qoder on 16-10-11.
 */
'use strict';

const router=require('koa-router')();
const controller=require('./user.controller');
const checkToken=require('../../middlewares/checkToken');
const checkActive=require('../../middlewares/checkActive');

router.use(checkToken,checkActive);
router.get('/info',controller.getUserInfo);
router.post('/password',controller.resetPass);

module.exports=router;
