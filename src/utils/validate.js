/**
 * Created by jiachenpan on 16/11/18.
 */

function spaceFun(str) {
  return str === '';
}

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

// 输入前后不许有空格以及必输
export function validateSpace(str) {
  return !!str && /^[^ ]+[\s\S]*/.test(str);
}

// 非必填项的首位不允许有空格
export function validateNonSpace(str) {
  return spaceFun(str) || /^[^ ]+[\s\S]*/.test(str);
}

// 输入字符长度
export function validateLen(str, len) {
  return Number(str.length) >= len;
}

// 邮箱验证
export function validateEmail(str) {
  const reg = /^[a-zA-Z0-9_-]{1,25}.*@[a-zA-Z0-9._-]+(\.[a-zA-Z]{2,5})+$/;
  return reg.test(str);
}

// 仅可输入中英文、数字、 - 或为空;
export function validateWord(str) {
  return spaceFun(str) || /^[\u4e00-\u9fa5a-zA-Z0-9\-]+$/.test(str);
}

// 输入中英文、数字、半角符号且根据必填非必填返回结果
export function validateSymbol(str) {
  return spaceFun(str) || /^[\u4e00-\u9fa5a-zA-Z0-9\u0000-\u00FF]+$/.test(str);
}
