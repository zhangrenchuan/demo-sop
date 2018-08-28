import request from '@/utils/request';

// 获取不同的 API 前缀，若接口上不写 API 前缀，则默认 BASE_API
// const BASE_API = process.env.BASE_API

// 用户名密码获取 token
export function login(username, password) {
  return request({
    url: `/user/login`,
    method: 'post',
    data: {
      platform: 'open',
      username,
      password
    }
  });
}

// 根据 token 获取用户信息
export function getInfo() {
  return request({
    url: '/api/cust/platform/customer',
    params: {
      platform: 'open'
    },
    method: 'get'
  });
}

// 退出登录
export function logout() {
  return request({
    url: '/api/api/v1/uac/user/logout',
    method: 'post'
  });
}
