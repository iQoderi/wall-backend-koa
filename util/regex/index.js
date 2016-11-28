/**
 * Created by qoder on 16-11-28.
 */
'use strict';

const regexFactory=()=>{
  return {
    email:/^\w{1,}@{1}.{1}\w{1,}/,
    password:/\w{1,6}/
  }
}

module.exports=regexFactory();
