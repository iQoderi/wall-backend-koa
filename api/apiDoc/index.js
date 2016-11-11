/**
 * Created by qoder on 16/10/11.
 */
'use strict';

const router = require('koa-router')();
const views=require('co-views');

const render=views(__dirname+'/../../views',{
  map:{html:'ejs'}
});

router.get('/', function *() {
  console.log('called')
  this.body=yield render('api',{html:'13132'});
});

module.exports = router;
