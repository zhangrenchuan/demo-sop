import Cookies from 'js-cookie';

const TokenKey = 'Open-Opt-Authorization';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token, expires) {
  return setCookie(TokenKey, token, expires);
  // return Cookies.set(TokenKey, token, { expires: 30 });
}

export function removeToken() {
  return setCookie(TokenKey, '', -1);
  // return Cookies.remove(TokenKey);
}

function setCookie(c_name, n_value, expiresIn) {
  const exdate = new Date();
  exdate.setTime(exdate.getTime() + expiresIn * 1000);
  document.cookie = `${c_name}=${escape(n_value)};expires=${exdate.toGMTString()}`;
}
