/**
 * Created by qoder on 16-10-10.
 */
'use strict';

const router = require('koa-router')();
const controller = require('./auth.controller');
const checkNull = require('../../middlewares/checkNull');
const hashPassword = require('../../middlewares/hashPassword');
const regMailSender=require('../../middlewares/regMailSender');

router.post('/login', checkNull(['email', 'password']), hashPassword, controller.login);
router.post('/register', checkNull(['email', 'password']), hashPassword, controller.register,regMailSender);
router.post('/resendEmail', checkNull(['email']),controller.resendEmail,regMailSender);

module.exports = router;
