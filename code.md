# WALL api错误码

内网接口地址和文档地址:http://10.17.0.147:9001（只能在实验室内使用）
外网接口地址和文档地址:http://api.wall.qoder.cn
-----------------------------------

|错误码|错误方法名|错误信息
|-----|--------|-------
|通用
|0    | Request Success| 请求成功
|-1   | UnKown Error | 未知错误
|10000| BadRequestException| 参数或者方法错误
|10001| Username or Password Wrong| 用户名或者密码错误
|10002| User Count is Not Active |用户账户没有激活
|10003| User exsite| 用户已经存在
|10004| Email send Fail | 邮件发送失败
|10005| User Not Exsit | 用户不存在
|10006| User Is Active | 用户已经激活账户
|10007| Login Expires | 登录过期
|10008| Login Expires | token错误或者过期
|10009| Old Password Error | 旧密码错误
|10010| Update Password Fail  | 修改密码失败
|10011| User Not Has Role  | 用户没有权限
|10012| User Has Block  | 拉黑用户失败

