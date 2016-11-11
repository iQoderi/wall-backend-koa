/**
 * Created by qoder on 16-10-11.
 */
const router = require('koa-router')();
const controller = require('./email.controller');
const checkToken = require('../../util/token/checkToken');

router.use(checkToken);
router.get('/', controller.getEmail);
router.post('/', controller.addEmail);
router.put('/:id', controller.modifyEmail);
router.delete('/:id', controller.deleteEmail);

module.exports = router;
