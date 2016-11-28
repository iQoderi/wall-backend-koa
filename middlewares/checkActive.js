/**
 * Created by qoder on 16-11-28.
 */
'use strict';
const checkUserActive=function *(next) {
  const user=this.user;
  if(user.isActive===1){
    yield next;
  }else{
    this.body={code:10002}
  }
}

module.exports=checkUserActive;
