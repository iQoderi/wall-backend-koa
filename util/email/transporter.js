/**
 * Created by qoder on 16-10-11.
 */
"use strict";

const nodeEmailer=require('nodemailer');
const EmailAuth=require('../../config/email');

//开启一个SMTP连接池
const  transporter=nodeEmailer.createTransport("SMTP",{
  host:"smtp.163.com",   //主机
  secureConnection:true,   //使用SSL,
  port:465,    //SMTP端口
  auth:EmailAuth
});

module.exports=transporter;
