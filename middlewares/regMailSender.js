/**
 * Created by qoder on 16-11-28.
 */
'use strict';
const transporter = require('../util/email/transporter');
const templateMaker = require('../util/mailTpl/register');
const config = require('../config/env');

const regMailSender = function *() {
  const body = this.request.body;
  const subject = '东北大学秦皇岛分校数学与统计学院大学生就业择业平台';
  const authLink = `${config.host}/users/register/confirmmail?token=${body.token.token}&email=${body.email}+&subject=${encodeURI(subject)}`;
  const html = templateMaker(authLink);
  const mailOptions = {
    from: 'neuqstbysgl@163.com',
    to: body.email,
    subject: subject,
    text: '欢迎使用东北大学秦皇岛分校数统科创实验室弹幕系统',
    html: html
  }

  let promise = new Promise((resolve, reject)=> {
    transporter.sendMail(mailOptions, (err, info)=> {
      if (err) {
        reject(err)
      } else {
        resolve(info)
      }
    })
  })

  let hasSendMail = yield promise;
  if(hasSendMail){
    this.body = {code: 0}
  }else{
    this.body={code:10004}
  }
}

module.exports = regMailSender;
