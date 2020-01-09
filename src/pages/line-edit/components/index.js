/* eslint-disable import/first */
import React from 'react';
import {connect} from 'dva';
import {Button, Modal, Table, Divider, Spin, Badge} from 'antd';
import {checkError, checkEdit, getPageParam, string2Moment} from 'utils';

import ConTablePopover from 'components/ConTablePopover';
import ConTableStateAction from 'components/ConTableStateAction';
import ConEditTable from 'components/ConEditTable';

import Search from './Search';
// import ActionModal from './Modal';


const confirm = Modal.confirm;


@connect((state) => ({
  productAdModel: state.productAdModel,
}))

class ProductAd extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {
    this.getAdData();
  }

  // 获取数据
  getAdData = (payload) => {
    this.setState({loading: true});
    this.props.dispatch({
      type: 'productAdModel/getAd',
      payload,
      callback: (data) => {
        let stateTemp = {loading: false};
        this.setState(stateTemp);
      },
    });
  };


  // 删除表格数据
  delAdData = (payload) => {
    this.setState({loading: true});
    this.props.dispatch({
      type: 'productAdModel/delAd',
      payload,
      callback: (value) => {
        this.setState({loading: false});
        if (checkError(value)) {
          this.getAdData();
        }
      },
    });
  };

  //添加表格数据
  addAdData = (payload, callback) => {
    const {status, modalDataObj} = this.state;
    this.props.dispatch({
      type: 'productAdModel/addAd',
      payload: checkEdit(status, modalDataObj, payload),
      callback: (value) => {
        let success = false;
        if (checkError(value)) {
          this.getAdData();
          success = true;
        }
        callback(success);
      },
    });
  };


  // 搜索面板值
  onSearchPannel = (param) => {
    // this.getAdData({...param});
  };

  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({visible: true, status, modalDataObj: record});
  };

  // 修改分页
  onChangePage = (data) => {
    const searchObj = this.child.getSearchValue();
    // 获取分页数据
    this.getAdData({...getPageParam(data), ...searchObj});
  };

  // 删除弹框确认
  showDelCon = (payload) => {
    const _this = this;
    confirm({
      title: '您确定要删除吗',
      content: '',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      onOk() {
        // 删除数据
        _this.delAdData(payload);
      },
      onCancel() {
        console.log('取消删除');
      },
    });
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'order',
      key: 'order',
      render: (text, record, index) => {
        return index + 1;
      },
    },

    {
      title: '文本',
      dataIndex: 'input',
      key: 'input',
    },

    {
      title: '下拉',
      dataIndex: 'select',
      key: 'select',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      render: text => string2Moment(text),
    },
    {
      title: '数字',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '参照',
      dataIndex: 'canzao',
      key: 'canzao',
    },
    {
      title: '多文本',
      dataIndex: 'textarea',
      key: 'textarea',
      render: (text) => {
        return <ConTablePopover text={text} width={250}/>;
      },
    },
    // {
    //   title: '操作',
    //   dataIndex: 'action',
    //   key: 'action',
    //   // fixed: 'right',
    //   render: (text, record) => (
    //     <span>
    //        <a onClick={this.onShowModal.bind(this, 'edit', record)}>编辑</a>
    //       <Divider type="vertical"/>
    //       <a onClick={this.onShowModal.bind(this, 'desc', record)}>删除</a>
    //   </span>
    //   ),
    // },

  ];


  // 关闭弹框
  onClickClose = () => {
    this.setState({visible: false, status: 'add'});
  };


  render() {

    const {status, loading, visible, modalDataObj} = this.state;
    const {adData} = this.props.productAdModel;
    const {pageIndex, total, pageSize, rows} = adData;

    return (

      <div>
        <Spin spinning={loading}>
          <Search
            onSearch={this.onSearchPannel}
            onRef={(ref) => {// 设置ref属性
              this.child = ref;
            }}
          />
          <div className="table-operations">
            <Button onClick={this.onShowModal.bind(this, 'add')}>编辑</Button>
            <Button onClick={this.onShowModal.bind(this, 'add')}>删除</Button>
          </div>

          <ConEditTable/>
        </Spin>
      </div>
    );
  }
}

export default ProductAd;
