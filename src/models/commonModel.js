import * as commonService from '../services/commonService';


const initTable = {
  rows: [],
  pageIndex: 0,
  total: 0,
  pageSize: 20,
}

export default {
  namespace: 'commonModel',

  state: {
    menuData: null,
    fileData: { // 文件列表
      ...initTable
    },
    message: 0,
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

    // 获取菜单
    * getMenuTree({payload, callback}, {call, put, select}) {

      // const { data } = yield call(commonService.getMenuTree, payload);

      // todo 获取菜单
      const data = [
        {
          code: 'index',
          title: '首页',
          icon: 'home',
          closable: false
        },
        {
          title: '统计分析',
          code: 'dashboard',
          icon: 'dashboard',
          children: [
            {
              code: 'pie-chart',
              title: '饼图',
              icon: 'pie-chart',
            },
            {
              code: 'bar-chart',
              title: '条形图',
              icon: 'bar-chart',
            },
            {
              code: 'radar-chart',
              title: '雷达图',
              icon: 'radar-chart',
            },
            {
              code: 'scatter-chart',
              title: '散点图',
              icon: 'dot-chart',
            }
          ],
        },
        {
          code: 'single-table',
          title: '单表查询',
          icon: 'table',
        },
        {
          code: 'line-edit',
          title: '行内编辑',
          icon: 'number',
        },
        {
          code: 'main-children',
          title: '一主多子',
          icon: 'cluster',
        },
        {
          code: 'tree-card',
          title: '左树右卡',
          icon: 'layout',
        },
        {
          code: 'tree-table',
          title: '左树右表',
          icon: 'pic-right',
        },
        {
          title: '供应商系统',
          code: 'carry-out',
          icon: 'carry-out',
          children: [
            {title: '基础', code: 'basic', icon: 'bars',},
            {title: '入库', code: 'inbound', icon: 'import',},
            {title: '出库', code: 'outbound', icon: 'export',},
            {title: '物流', code: 'logistics', icon: 'car',},
          ],
        },
      ]


      yield put({type: 'updateState', res: {menuData: data}});
      if (callback) {
        callback(data);
      }

    },

    // 获取菜单
    * getAllMenu({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.getCommonMenuAll, payload);
      if (callback) {
        callback(data);
      }
    },

    // 用户退出
    * logout({payload, callback}, {call, put, select}) {
      const data = yield call(commonService.logout, payload);
      if (callback) {
        callback(data);
      }
    },

    // 自动登陆
    * needCode(payload, {call, put, select}) {
      return yield call(commonService.needCode, payload);
    },

    // 保存文件
    * addAttchment({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.addAttchment, payload);
      if (callback) {
        callback(data);
      }
    },

    //  分页查询附件
    * getAttchment({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.getAttchment, payload);
      console.log("datadata",data);

      let fileData=data?data:initTable;
      yield put({type: 'updateState', res: {fileData}});
      if (callback) {
        callback(data);
      }
    },

    // 删除文件
    * delAttchment({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.delAttchment, payload);
      if (callback) {
        callback(data);
      }
    },

    // 更新用户信息
    * updUser({payload, callback}, {call, put, select}) {
      const data = yield call(commonService.updUser, payload);
      if (callback) {
        callback(data);
      }
    },


    // 获取菜单
    * getMessage({payload, callback}, {call, put, select}) {
      const {data} = yield call(commonService.getMessage, payload);
      yield put({type: 'updateState', res: {message: data}});
      if (callback) {
        callback(data);
      }
    },

    // 获取短信验证码
    * getCode({payload, callback}, {call, put, select}) {
      const data = yield call(commonService.getCode, payload);
      callback(data);
    },


  },

};

