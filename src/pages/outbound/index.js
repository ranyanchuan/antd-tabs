/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Table } from 'antd';
import Header from 'components/header/index';
import Footer from 'components/footer/index';

import Search from 'components/Retail/inboundSearch';
import BasicModal from 'components/Retail/outboundBasic';

import styles from './index.less';
import moment from 'moment';


const confirm = Modal.confirm;
const ruleDate = 'YYYY-MM-DD';

@connect((state) => ({
  common: state.common,
}))

class Outbound extends React.Component {

  state = {
    searchObj: {}, //搜索面板数据
    selectedRowKeys: [], // 选中行key
    selectedRowObj: {}, // 选中行对象

    loading: false,
    basModVis: false,
    basModStatus: 'add',

    inboundDataObj: {}, // 影视数据

  };


  componentDidMount() {
    this.getTableData({ table: 'inbound' });
  }

  // 搜索面板值
  onSearchPannel = (param) => {
    this.getTableData({ ...param, table: 'inbound' });
  };


  // 获取表格数据
  getTableData = (payload) => {
    const { table } = payload;
    // 清空主表信息
    const tempState = {};
    tempState.inboundTableLoading = true;
    tempState.inboundDataObj = {};

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


  // 保存基本信息
  onClickSaveBasic = (data) => {

    const _this = this;
    let payload = data;
    // 添加操作表名
    payload.table = 'logistics';
    payload.status = 'distribution';

    const { number } = data;

    this.props.dispatch({
      type: 'common/add',
      payload,
      callback: (res) => {
        this.setState({ loading: false });
        const { status } = res;
        if (status === 'success') {
          // 更新库存
          _this.onUpdateBasic(number);

        } else {
          console.log('失败');
        }
      },
    });
  };


  // 保存基本信息
  onUpdateBasic = (number) => {
    let { selectedRowObj } = this.state;
    selectedRowObj.stock -= number;
    let payload = {};
    payload.type = 'common/upd';
    payload.condition = { _id: selectedRowObj['_id'] };
    payload.content = selectedRowObj;
    // 添加操作表名
    payload.table = 'inbound';
    // 获取表格数据
    this.onActionTable(payload);
  };


  onClickBuy = (value) => {
    //  1.弹框 2.是否会员，3.库存, 4.购买清单
    this.setState({ basModVis: true, selectedRowObj: value });

  };


  columns = [

    {
      title: '图片',
      dataIndex: 'fileList',
      key: 'fileList',
      render: (item) => {
        return (item && item.length > 0) ? <img src={item[0]} alt="图片" style={{ height: 40 }}/> : null;
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
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: '入库日期',
      dataIndex: 'createTime',
      key: 'createTime',
      sorter: (a, b) => a.createTime - b.createTime,
      render: (text) => {
        return text ? moment(text).format(ruleDate) : '';
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },

    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        const { stock } = record;
        let type = 'default';
        let disabled = true;
        if (stock && stock > 0) {
          type = 'primary';
          disabled = false;
        }
        return (
          <Button size={'small'} type={type} disabled={disabled}
                  onClick={this.onClickBuy.bind(this, record)}>购买</Button>
        );
      },

    },


  ];


  // 关闭弹框
  onClickClose = () => {
    this.setState({ basModVis: false, basModStatus: 'add' });
  };

  // 修改分页
  onChangeBasicPage = (data) => {
    const { current, pageSize } = data;
    const searchObj = this.child.getSearchValue();
    const param = {
      pageIndex: current - 1,
      size: pageSize,
    };
    // 获取分页数据
    this.getTableData({ ...param, ...searchObj, table: 'inbound' });
  };


  render() {

    const {
      inboundTableLoading, basModVis,
      basModStatus, selectedRowObj, inboundDataObj,
    } = this.state;


    return (
      <div className={styles.inbound}>
        <Search
          onSearch={this.onSearchPannel}
          // 设置ref属性
          onRef={(ref) => {
            this.child = ref;
          }}
        />
        <Table
          loading={inboundTableLoading}
          size="small"
          rowKey={record => record._id}
          columns={this.columns}
          dataSource={inboundDataObj.list ? inboundDataObj.list : []}
          pagination={{
            current: inboundDataObj.pageIndex + 1,
            total: inboundDataObj.count,
            pageSize: inboundDataObj.size,
          }}
          onChange={this.onChangeBasicPage}
          className={styles.newsTable}
        />

        <BasicModal
          visible={basModVis}
          status={basModStatus}
          onClose={this.onClickClose}
          onSave={this.onClickSaveBasic}
          basicData={selectedRowObj}
        />
      </div>


    );
  }
}

export default Outbound;

