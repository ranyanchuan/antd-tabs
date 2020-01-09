import { message } from 'antd';
import fetch from 'dva/fetch';
import router from 'umi/router';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {

  // if (!localStorage.getItem('loginName')) { // 没有登录跳转首页
  //   router.push('/');
  // }
  // debugger

  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const credentials = { credentials: 'include' };
  return fetch(url, options, headers, credentials)
  // return fetch(url, options, headers)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      // todo 权限管理

      const { code, info } = data;
      const filterUrls = ['/work/zhanneixin/getWD'];

      if (code == -5 && !filterUrls.includes(url)) { // 用户未登陆
        console.log("url",url);
        // debugger
        message.error(info);
        router.push('/login');
        return
      }

      return data;
    })
    .catch(err => ({ err }));
}

export function requestRaw(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      return data;
    })
    .catch(err => ({ err }));
}


export function requestJson(url, options) {
  // let headers = {
  //   'Content-Type': 'application/json',
  // };

  let headers = {
    'Content-Type': 'application/json',
  };

  return fetch(url, headers, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      return data;
    })
    .catch(err => ({ err }));
}
