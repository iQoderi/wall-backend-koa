/**
 * Created by qoder on 16/10/11.
 */
'use strict';

const transporter = require('./transporter');

function emailSender(auth, data, host, port) {
  let flag=true;
  host = host || 'smtp.qq.com';
  port = port || 465;
  let myTransporter = transporter(auth, host, port);
  myTransporter.sendMail(data, (err, info)=> {
    if (err) {
      flag=false;
    } else {
      if (info) {
        flag=true;
      }
    }
  });
  myTransporter.close();
  return flag;
}

module.exports = emailSender;
