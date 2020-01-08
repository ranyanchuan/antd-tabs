import { request } from 'utils/request';

import { formData } from 'utils/index';

const api = {
  getAd: '/admin/banner/page', // 分页查询
  addAd: '/admin/banner/save', // 保存Ad
  delAd: '/admin/banner/delete', // 删除Ad
  getAdInfo: '/admin/banner/queryInfo', // 获取信息
};


// 分页查询
export async function getAd(payload) {
  return request(api.getAd, {
    method: 'POST',
    body: formData(payload),
  });
}


// 保存广告信息
export async function addAd(payload) {
  return request(api.addAd, {
    method: 'POST',
    body: formData(payload),
  });
}


// 删除广告信息
export async function delAd(payload) {
  return request(api.delAd, {
    method: 'POST',
    body: formData(payload),
  });
}


// 获取广告信息
export async function getAdInfo(payload) {
  return request(api.getAdInfo, {
    method: 'POST',
    body: formData(payload),
  });
}

