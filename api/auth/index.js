/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const router = require('koa-router')();
const controller = require('./auth.controller');
const checkNull = require('../../middlewares/checkNull.middleware');
const checkToken=require('../../middlewares/checkToken');
const hashPassword = require('../../middlewares/hashPassword.middleware');
const regMailSender=require('../../middlewares/regMailSender.middleware');
const fpMailSender=require('../../middlewares/fpMailSender.middleware');

router.post('/login', checkNull(['email', 'password']), hashPassword, controller.login);
router.post('/register', checkNull(['email', 'nickname','password']), hashPassword, controller.register,regMailSender);
router.post('/reSendEmail', checkNull(['email']),controller.resendEmail,regMailSender);
router.post('/forgetPass', checkNull(['email']),controller.forgetPass,fpMailSender);
router.put('/resetPass', checkToken,checkNull(['password']),controller.resetPass);

module.exports = router;
