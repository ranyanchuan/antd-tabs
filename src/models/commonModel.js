import * as commonService from '../services/commonService';

export default {
  namespace: 'commonModel',

  state: {
    menuData: null,
    bpmData: {  // todo 修改
      rows: [],
      pageIndex: 0,
      total: 0,
      pageSize: 20,
    },

    fileData: { // 文件列表
      rows: [],
      pageIndex: 0,
      total: 0,
      pageSize: 20,
    },
    message: 0,

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

    // 获取菜单
    * getMenuTree({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.getMenuTree, payload);
      yield put({ type: 'updateState', res: { menuData: data } });
      if (callback) {
        callback(data);
      }
    },


    // 获取菜单
    * getAllMenu({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.getCommonMenuAll, payload);
      if (callback) {
        callback(data);
      }
    },


    // 用户退出
    * logout({ payload, callback }, { call, put, select }) {
      const data = yield call(commonService.logout, payload);
      if (callback) {
        callback(data);
      }
    },

    // 自动登陆
    * needCode(payload, { call, put, select }) {
      return yield call(commonService.needCode, payload);
    },


    // 分页查询
    * getBpm({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.getBpm, payload);
      if (data) {
        yield put({ type: 'updateState', res: { bpmData: data } });
      }
      if (callback) {
        callback(data);
      }
    },

    // 保存流程
    * addBpm({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.addBpm, payload);
      if (callback) {
        callback(data);
      }
    },


    // 删除流程
    * delBpm({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.delBpm, payload);
      if (callback) {
        callback(data);
      }
    },

    // 获取流程信息
    * getBpmInfo({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.getBpmInfo, payload);
      yield put({ type: 'updateState', res: { bpmInfoData: data } });
      if (callback) {
        callback(data);
      }
    },

    // 发布流程信息
    * deployBpm({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.deployBpm, payload);
      if (callback) {
        callback(data);
      }
    },

    // 保存文件
    * addAttchment({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.addAttchment, payload);
      if (callback) {
        callback(data);
      }
    },

    //  分页查询附件
    * getAttchment({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.getAttchment, payload);
      if (data) {
        yield put({ type: 'updateState', res: { fileData: data } });
      }
      if (callback) {
        callback(data);
      }
    },

    // 删除文件
    * delAttchment({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.delAttchment, payload);
      if (callback) {
        callback(data);
      }
    },

    // 更新用户信息
    * updUser({ payload, callback }, { call, put, select }) {
      const data = yield call(commonService.updUser, payload);
      if (callback) {
        callback(data);
      }
    },


    // 获取菜单
    * getMessage({ payload, callback }, { call, put, select }) {
      const { data } = yield call(commonService.getMessage, payload);
      yield put({ type: 'updateState', res: { message: data } });
      if (callback) {
        callback(data);
      }
    },

    // 获取短信验证码
    * getCode({ payload, callback }, { call, put, select }) {
      const data = yield call(commonService.getCode, payload);
      callback(data);
    },


  },


};

