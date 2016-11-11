/**
 * Created by qoder on 16-10-11.
 */
const router = require('koa-router')();
const controller = require('./work.controller');
const checkToken = require('../../util/token/checkToken');

router.use(checkToken);
router.get('/', controller.getWork);
router.post('/', controller.addWork);

module.exports = router;
