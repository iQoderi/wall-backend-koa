/**
 * Created by qoder on 16-10-11.
 */
'use strict';

const mongoose = require('mongoose');
const uuid = require('uuid');
const emailModel = require('../../models/email.model');
const workModel = require('../../models/work.model');
const checkData = require('../../util/checkData');
const mailSender = require('../../util/email/sender');
const numberToChinese = require('../../util/numberToChinese');
const Email = mongoose.model('Email');
const Work = mongoose.model('Work');


/**
 * 提交作业
 */
exports.addWork = function *() {
  const body = this.request.body;
  const data = {
    mailId: body.mailId,
    sendTo: body.sendTo,
    times: body.times,
    lesson: body.lesson,
    content: body.content
  };

  if (checkData(data)) {
    const condition = {
      id: body.mailId
    };
    const email = yield Email.findOne(condition);
    if (email) {
      const subject = `${email.stuCode}${email.belongTo}${data.lesson}第${numberToChinese(data.times)}次作业`;
      const mailAuth = {
        user: email.email,
        pass: email.pass
      };
      const mailOptions = {
        from: email.email,
        to: data.sendTo,
        subject: subject,
        text: data.content
      };
      if (mailSender(mailAuth, mailOptions)) {
        data.title = subject;
        data.id = uuid.v4();
        data.stuCode = email.stuCode;
        data.belongTo = email.belongTo;
        data.email = email.email;
        data.accountId = this.user.id;
        data.createAt = Date.now();
        const newWork = new Work(data);
        yield newWork.save();
        this.body = {code: 0};
      } else {
        this.body = {code: 10009}
      }
    } else {
      this.body = {code: 10008};
    }
  } else {
    this.body = {code: 10001}
  }
};

/**
 * 获取作业列表
 * email
 * times
 * belongTo
 */
exports.getWork = function *() {
  const condition = this.query;
  condition.accountId = this.user.id;
  const works = yield Work.find(condition);
  this.body = {
    code: 0,
    data: {
      works: works
    }
  }
};
