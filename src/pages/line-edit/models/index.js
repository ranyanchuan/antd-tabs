import * as services from '../services';

import {lineEdit} from 'utils/mockData';

export default {
  namespace: 'lineEditModel',

  state: {

    mainData: {
      rows: [],
      pageIndex: 0,
      total: 0,
      pageSize: 20,

    },
  },


  reducers: {

    updateState(state, {res}) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },


  effects: {

    //  分页查询
    * getData({payload, callback}, {call, put, select}) {

      // const {data} = yield call(services.getAd, payload);
      let data = lineEdit;
      if (data) {
        yield put({type: 'updateState', res: {mainData: data}});
      }
      if (callback) {
        callback(data);
      }
    },

    // 添加广告信息
    * addAd({payload, callback}, {call, put, select}) {
      const data = yield call(services.addAd, payload);
      if (callback) {
        callback(data);
      }
    },


    // 删除广告信息
    * delAd({payload, callback}, {call, put, select}) {
      const data = yield call(services.delAd, payload);
      if (callback) {
        callback(data);
      }
    },


    // 获取广告信息
    * getAdInfo({payload, callback}, {call, put, select}) {
      const data = yield call(services.getAdInfo, payload);
      if (callback) {
        callback(data);
      }
    },

  },


};

