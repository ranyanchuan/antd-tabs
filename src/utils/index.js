import moment from 'moment';

/**
 /**
 * 生成唯一字符串
 */
export function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
}


export function randomObjArray(obj, len) {
  let arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(obj);
  }
  return arr;
}


// 添加 status 和  uid
export function addUidList(fileUrlList) {
  if (!fileUrlList || !Array.isArray(fileUrlList)) {
    return fileUrlList
  }
  const filesUrl = fileUrlList.map((item, index) => {
    return {status: 'done', uid: index, url: item};
  });
  return filesUrl;
};


export function randomNum(m, n) {
  return Math.floor(Math.random() * (m - n) + n);
}


// 获取树选中的值
export function tree2Map(data, key) {
  let map = {};
  treeMap(data, map, key);
  return map;
}


export function treeMap(data, map, key) {

  if (!Array.isArray(data)) {
    return data;
  }

  for (let item of data) {
    let {children} = item;
    map[item[key]] = item;
    if (children) {
      treeMap(children, map, key);
    }
  }
  return map;
}

export function string2Moment(text, ruleDate = 'YYYY-MM-DD HH:mm') {
  return text ? moment(text).format(ruleDate) : '';
}


// 判断是否要显示弹框底部按钮
export function footer(disabled) {
  let result = null;
  if (disabled) {
    result = { footer: null };
  }
  return result;
}

// json 数据转换成表单格式
export function formData(payload) {
  let data = new FormData();
  for (let key in payload) {   // 转换表单
    data.append(key, payload[key]);
  }
  return data;
}
