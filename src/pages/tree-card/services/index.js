import { request, requestRaw } from 'utils/request';
import { formData } from 'utils/index';

const api = {
  getShangpinfenlei: '/admin/shangpinfenlei/getByPid', // 分页查询商品分类
  addShangpinfenlei: '/admin/shangpinfenlei/save', // 保存
  delShangpinfenlei: '/admin/shangpinfenlei/delete', // 删除
  getShangpinfenleiInfo: '/admin/shangpinfenlei/queryInfo', // 获取信息
};

// 分页查询
export async function getShangpinfenlei(payload) {
  return request(api.getShangpinfenlei, {
    method: 'POST',
    body: formData(payload),
  });
}


// 保存信息
export async function addShangpinfenlei(payload) {
  return requestRaw(api.addShangpinfenlei, {
    method: 'POST',
    body: formData(payload),
  });
}


// 删除信息
export async function delShangpinfenlei(payload) {
  return requestRaw(api.delShangpinfenlei, {
    method: 'POST',
    body: formData(payload),
  });
}


// 获取信息
export async function getShangpinfenleiInfo(payload) {
  return requestRaw(api.getShangpinfenleiInfo, {
    method: 'POST',
    body: formData(payload),
  });
}
