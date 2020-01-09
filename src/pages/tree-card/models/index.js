import * as services from '../services';

export default {
  namespace: 'operationShangpinfenleiModel',
  state: {
    shangpinfenleiData: [],
  },
  reducers: {
    updateState(state, { res }) { //更新state
      return {
        ...state,
        ...res,
      };
    },
  },
  effects: {
    //  分页查询
    * getShangpinfenlei({ payload, callback }, { call, put, select }) {
      const { data } = yield call(services.getShangpinfenlei, payload);
      // if (data) {
      //   yield put({ type: 'updateState', res: { shangpinfenleiData: data } });
      // }
      if (callback) {
        callback(data);
      }
    },

    // 添加Shangpinfenlei
    * addShangpinfenlei({ payload, callback }, { call, put, select }) {
      const data = yield call(services.addShangpinfenlei, payload);
      if (callback) {
        callback(data);
      }
    },

    // 删除Shangpinfenlei
    * delShangpinfenlei({ payload, callback }, { call, put, select }) {
      const data = yield call(services.delShangpinfenlei, payload);
      if (callback) {
        callback(data);
      }
    },

    // 获取Shangpinfenlei信息
    * getShangpinfenleiInfo({ payload, callback }, { call, put, select }) {
      const data = yield call(services.getShangpinfenleiInfo, payload);
      if (callback) {
        callback(data);
      }
    },
  },

};
