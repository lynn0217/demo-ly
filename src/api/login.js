import service from "@/tools/request.js";
//获取验证码
export function GetSms(data) {
  return service.request({
    method:'post',
    url:'/getSms/',
    data:data
  })
}

//获取用户角色

//登录

//注册