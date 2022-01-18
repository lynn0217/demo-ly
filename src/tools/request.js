import axios from 'axios'
//单独引入element弹出的组件
import { ElMessage } from 'element-plus'
//创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/api'
const service = axios.create({
  baseURL: BASEURL,
  timeout: 1000,
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  return Promise.reject(error);
});
//添加响应拦截器
service.interceptors.response.use(function (response) {
  //邮箱为空弹出提示（后台
  let data = response.data
  if(data.resCode!== 0) {
    ElMessage.error(data.message);
    return Promise.reject(data)
  }else {
    return response;
  }
}, function (error) {
  return Promise.reject(error);
});



export default service