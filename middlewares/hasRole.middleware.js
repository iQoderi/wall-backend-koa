/**
 * Created by qoder on 16-11-29.
 */
'use strict';
/**
 * 检查权限
 * @param role
 * @returns {Function}
 */
const checkRole = function (role) {
  return function *(next) {
    const user = this.user;
    if (user.role == role) {
      yield next;
    } else {
      this.body = {code: 10011}
    }
  }
}

module.exports=checkRole;
