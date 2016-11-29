/**
 * Created by qoder on 16-11-29.
 */
'use strict';
const router = require('koa-router')();
const controller = require('./admin.controller');
const hashPassword = require('../../middlewares/hashPassword.middleware');
const checkNull = require('../../middlewares/checkNull.middleware');
const checkToken = require('../../middlewares/checkToken');
const hashRole = require('../../middlewares/hasRole.middleware');

router.post('/login', hashPassword, controller.login);
router.get('/subAdmin', checkNull, hashRole(1), checkToken, controller.getSubAdmin);
router.post('/subAdmin', checkNull, hashRole(1), checkToken, hashPassword, controller.addSubAdmin);
router.delete('/subAdmin/:id', checkNull, hashRole(1), checkToken, controller.rmSubAdmin);

module.exports = router;
