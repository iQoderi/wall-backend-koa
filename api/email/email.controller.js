/**
 * Created by qoder on 16-10-11.
 */
"use strict";

const mongoose = require('mongoose');
const uuid = require('uuid');
const emailModel = require('../../models/email.model');
const checkData = require('../../util/checkData');
const Email = mongoose.model('Email');


/**
 * 获取邮箱
 */
exports.getEmail = function *() {
  const condition = {
    accountId: this.user.id
  };

  const email = yield Email.find(condition, {_id: 0, id: 1, belongTo: 1, email: 1, accountId: 1,stuCode:1});
  this.body = {
    code: 0,
    data: {
      email: email
    }
  }
};

/**
 * 添加邮箱
 */
exports.addEmail = function *() {
  const body = this.request.body;
  const condition = {
    id: uuid.v4(),
    accountId: this.user.id,
    belongTo: body.name,
    email: body.email,
    pass: body.pass,
    stuCode: body.stuCode
  };

  if (checkData(condition)) {
    const email = yield Email.findOne({email: body.email});
    if (email) {
      this.body = {
        code: 10007
      }
    } else {
      const newEmail = new Email(condition);
      yield newEmail.save();
      this.body = {
        code: 0
      }
    }
  } else {
    this.body = {
      code: 10001
    }
  }
};

/**
 * 编辑邮箱
 */
exports.modifyEmail = function *() {
  const body = this.request.body;
  const update = {
    email: body.email,
    belongTo: body.name,
    pass: body.pass,
    stuCode: body.stuCode
  };
  if (checkData(update)) {
    let condition = {
      id: this.params.id
    };
    const email = yield Email.update(condition, update);
    if (email.n === 1) {
      this.body = {
        code: 0
      };
    } else {
      this.body = {
        code: 10008
      };
    }
  } else {
    this.body = {
      code: 10001
    }
  }
};

/**
 * 删除邮箱
 */
exports.deleteEmail = function *() {
  const condition = {id: this.params.id};
  const email = yield Email.remove(condition);
  if (email.result.n === 1) {
    this.body = {
      code: 0
    }
  } else {
    this.body = {
      code: 10008
    }
  }
};


