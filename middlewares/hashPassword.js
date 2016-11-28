/**
 * Created by qoder on 16-11-28.
 */
'use strict';
const hash=require('../util/hash');
const hashPassword = function *(next) {
  const body = this.request.body;
  try {
    body.password=hash(body.email, body.password);
  } catch (e) {
    this.body={code:-1}
  }

  yield next;
}

module.exports=hashPassword;
