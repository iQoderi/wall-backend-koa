/**
 * Created by qoder on 16-11-28.
 */
"use strict";
const checkNull = function (data) {
  return function *(next) {
    const body=this.request.body;
    let isNull = data.every((each)=> {
      return !body[each];
    })
    if (isNull) {
      this.body={code:10000}
    } else {
      yield next;
    }
  }
}

module.exports = checkNull;
