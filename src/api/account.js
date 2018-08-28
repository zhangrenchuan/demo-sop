import request from '@/utils/request';

export function getAccountInfo() {
  return request({
    url: '/api/cust/platform/account/information', // url指向的是server里的文件中的请求名
    method: 'get',
    params: {
      platform: 'open'
    }
  });
}

export function changePassWord(data) {
  return request({
    url: '/api/api/v1/uac/user/changePassword', // url指向的是server里的文件中的请求名
    method: 'post',
    data
  });
}
