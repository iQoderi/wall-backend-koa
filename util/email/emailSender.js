/**
 * Created by qoder on 16-11-28.
 */
'use strict';
const mailTransporter = require('./transporter');

const emailSender = (data)=> {
  mailTransporter.sendMail(data, (err, info)=> {
    if (err) {
      this.body = {code: 10004}
    } else {
      if (info) {
        this.body = {code: 0}
      }
    }
  })
}

module.exports = emailSender;
