/**
 * Created by qoder on 16-10-11.
 */
"use strict";

function checkData(obj) {
  if (typeof obj === 'object') {
    for (let item in obj) {
      if (!obj[item]) {
        return false;
      }
    }
  } else {
    throw new Error('checkDate arguments must be object');
  }

  return true;
}

module.exports = checkData;
