import axios from 'axios';
import { Message, MessageBox } from 'element-ui';
import store from '../store';
import router from '../router';
import { getToken } from '@/utils/auth';
import { errCodeMsg } from './errCodeMsg';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
  const access_token = getToken();
  if (access_token) {
    config.headers['Authorization'] = 'Bearer ' + access_token; // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  if (config.type === 'from') {
    config.headers['content-type'] = 'application/x-www-form-urlencoded';
  }
  return config;
}, error => {
  // Do something with request error
  Promise.reject(error);
});

// respone拦截器
service.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    error = error.response.data;
    // 401 或 403 且不在登录页面时，弹出登录过期弹窗
    if ((error.status === 401 || error.status === 403) && router.currentRoute.path !== '/login') {
      MessageBox.confirm('您的访问权限已过期或您已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      });
    } else {
      // 对 error 加一层包装，使前端可以通过调用 errHandleFn 进行统一错误处理
      const errorParams = {
        error,
        errHandleFn: function(errCodeModule) {
          Message({
            message: errCodeMsg(error.errCode) || errCodeMsg(errCodeModule) || error.errMsg || error.message,
            type: 'error',
            duration: 5 * 1000
          });
        }
      };
      return Promise.reject(errorParams);
    }
  }
);

export default service;
