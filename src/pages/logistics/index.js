/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Button, Table, Icon } from 'antd';

import Header from 'components/header/index';
import Footer from 'components/footer/index';

import Search from 'components/Retail/logisticsSearch';

import styles from './index.less';

const ruleDate = 'YYYY-MM-DD';

@connect((state) => ({
  common: state.common,
}))

class Logistics extends React.Component {

  state = {
    searchObj: {}, //搜索面板数据
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

    loading: false,
    basModVis: false,
    basModStatus: 'add',
    logisticsDataObj: {}, // 影视数据

  };


  componentDidMount() {
    this.getTableData({ table: 'logistics' });
  }

  // 搜索面板值
  onSearchPannel = (param) => {
    this.getTableData({ ...param, table: 'logistics' });
  };


  // 获取表格数据
  getTableData = (payload) => {
    const { table } = payload;
    // 清空主表信息
    const tempState = {};
    tempState.inboundTableLoading = true;
    tempState.logisticsDataObj = {};

    this.setState(tempState);

    this.props.dispatch({
      type: 'common/query',
      payload,
      callback: (response) => {

        const { list = [] } = response;
        const stateTemp = {};
        // 更新 table 数据
        if (list.length > 0) {
          const { _id } = list[0];
          stateTemp.selectedRowKeys = [_id];
          stateTemp.selectedRowObj = list[0];
        }
        stateTemp[table + 'DataObj'] = response;
        stateTemp[table + 'TableLoading'] = false;
        // 更新表格数据
        this.setState(stateTemp);
      },
    });
  };

  // 添加 || 更新 || 删除
  onActionTable = (payload) => {
    const { type, table } = payload;
    delete  payload.type;
    // 添加或者更新明星基本数据
    this.props.dispatch({
      type,
      payload,
      callback: (res) => {
        this.setState({ loading: false });
        const { status } = res;
        if (status === 'success') {
          // 获取table 数据
          let param = this.child.getSearchValue();
          param.table = table;

          // 获取表格数据
          this.getTableData(param);
        } else {
          console.log(type, '失败');
        }
      },
    });
  };


  columns = [
    {
      title: '顾客名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '购买日期',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },
    {
      title: '地址',
      dataIndex: 'town',
      key: 'town',
      render: (town, record) => {
        const { village, group } = record;
        return (
          <span>{town}{village}{group}</span>
        );
      },
    },
    {
      title: '种类',
      dataIndex: 'domain',
      key: 'domain',
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand',
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },

    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        if (text && text === 'distribution') {
          return <span>
            <Icon type="clock-circle" style={{ color: '#ff4d00', marginRight: '10px' }}/>
              <span>正在配送</span>
              </span>;
        } else {
          return <span>
                      <Icon type="check-circle" style={{ color: '#53ff1b', marginRight: '10px' }}/>
                    <span>配送完成</span>
                    </span>;
        }
      },
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        return (
          <Button size={'small'} type="primary" onClick={this.onClickFinish.bind(this, record)}>完成</Button>
        );
      },
    },
  ];


  // 修改分页
  onChangeBasicPage = (data) => {
    const { current, pageSize } = data;
    const searchObj = this.child.getSearchValue();
    const param = {
      pageIndex: current - 1,
      size: pageSize,
    };
    // 获取分页数据
    this.getTableData({ ...param, ...searchObj, table: 'logistics' });
  };


  onClickFinish = (value) => {
    let payload = {};
    value.status = 'finish';
    payload.type = 'common/upd';
    payload.condition = { _id: value['_id'] };
    payload.content = value;
    // 添加操作表名
    payload.table = 'logistics';
    // 获取表格数据
    this.onActionTable(payload);

  };


  render() {

    const { logisticsTableLoading, logisticsDataObj } = this.state;


    return (
      <div className={styles.logistics}>
        <Header/>
        <Search
          onSearch={this.onSearchPannel}
          // 设置ref属性
          onRef={(ref) => {
            this.child = ref;
          }}
        />
        <Table
          loading={logisticsTableLoading}
          size="small"
          rowKey={record => record._id}
          columns={this.columns}
          dataSource={logisticsDataObj.list ? logisticsDataObj.list : []}
          pagination={{
            current: logisticsDataObj.pageIndex + 1,
            total: logisticsDataObj.count,
            pageSize: logisticsDataObj.size,
          }}
          onChange={this.onChangeBasicPage}
          className={styles.newsTable}
        />
        <Footer/>

      </div>

    );
  }
}

export default Logistics;
;

