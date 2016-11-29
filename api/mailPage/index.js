/**
 * Created by qoder on 16-11-29.
 */
'use strict';
const router = require('koa-router')();
const controller = require('./mailPage.controller');
const checkToken = require('../../middlewares/checkToken');

router.get('/register', checkToken, controller.register);
router.get('/forgetPass', checkToken, controller.forgetPass);

module.exports = router;
