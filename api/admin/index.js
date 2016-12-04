/**
 * Created by qoder on 16-11-29.
 */
'use strict';
const router = require('koa-router')();
const controller = require('./admin.controller');
const hashPassword = require('../../middlewares/hashPassword.middleware');
const checkNull = require('../../middlewares/checkNull.middleware');
const checkToken = require('../../middlewares/checkAdminToken');
const hashRole = require('../../middlewares/hasRole.middleware');

router.post('/login', hashPassword, controller.login);
router.get('/subAdmin',checkToken, hashRole(1), controller.getSubAdmin);
router.post('/subAdmin', checkNull(['email','password']), checkToken,hashRole(1), hashPassword, controller.addSubAdmin);
router.delete('/subAdmin/:id', checkToken,hashRole(1), controller.rmSubAdmin);

module.exports = router;
