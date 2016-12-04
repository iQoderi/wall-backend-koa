/**
 * Created by qoder on 16-11-28.
 */
'use strict';

const msgType = {
  COMMON: {
    TOKEN: 'TOKEN',    //客户端登录验证
  },
  BOOM: {
    TOKEN: 'BOOMTOKEN',
    RECVMESSAGE: 'BOOMRECVMESSAGE',  //接受客户端弹幕消息
  },
  WALL: {
    TOKEN: 'WALLTOKEN',
    MESSAGE: 'WALLMESSAGE',    //客户端发送上墙消息
  },
  ADMIN: {
    TOKEN: 'ADMINTOKEN',   //管理员验证
    PULMESSAGE: 'ADMINPULMESSAGE',   //管理员审核通过上墙消息
    REDOMESSAGE: 'ADMINREDOMESSAGE',    //管理员撤回消息
    SHIELDUSER: 'SHIELDUSER',              //管理员拉黑用户
    REDOSHIELDUSER: 'REDOSHIDLDUSER'     //管理员撤销拉黑用户
  },
  SERVER: {
    AUTHSUCC: 'AUTHSUCC',  //客户端验证通过
    AUTHFAIL: 'AUTHFAIL', //客户端验证失败
    PULBOOMMESSAGE: 'PULBOOMMESSAGE',     //向客户端广播弹幕
    WALLMESSAGESUCCESS: 'WALLMESSAGESUCCESS',  //向客户端发送上墙消息接收成功


    ADMINAUTHSUCC: 'ADMINAUTHSUCC',   //管理员验证通过
    ADMINAUTHFAIL: 'ADMINAUTHFAIL',    //管理员验证失败
    PULWALLMESSAGETOADMIN: 'PULWALLMESSAGETOADMIN',     //向管理端推送最新上墙消息
    ADMINSHIELDUSERSUCC: 'ADMINSHIELDUSERSUCC',              //管理员拉黑用户
    ADMINSHIELDUSERFAIL: 'ADMINSHIELDUSERFAIL',              //管理员拉黑用户
    ADMINREDOSHIELDUSERSUCC: 'ADMINREDOSHIDLDUSERSUCC',     //管理员撤销拉黑用户
    ADMINREDOSHIELDUSERFAIL: 'ADMINREDOSHIDLDUSERFAIL',    //管理员撤销拉黑用户

    PULWALLMESSAGE: 'PULWALLMESSAGE',   //向墙端广播上墙消息
    REDOWALLMESSAGE: 'REDOWALLMESSAGE',    //向墙端广播撤回消息

  }
}

module.exports = msgType;
