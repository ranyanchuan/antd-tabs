/* eslint-disable import/first */
import React from 'react';
import {connect} from 'dva';
import {Button, Modal, Table, Divider, Spin, Badge} from 'antd';
import {checkError, checkEdit, getPageParam, string2Moment} from 'utils';

import ConTablePopover from 'components/ConTablePopover';
import ConTableStateAction from 'components/ConTableStateAction';
import ConEditTable from 'components/ConEditTable';
import ConTableTag from 'components/ConTableTag';

import Search from './Search';
// import ActionModal from './Modal';


const confirm = Modal.confirm;


@connect((state) => ({
  lineEditModel: state.lineEditModel,
}))

class ProductAd extends React.Component {

  state = {
    loading: false,
    visible: false,
    status: 'add',
    modalDataObj: {}, //  弹框数据
  };

  componentDidMount() {
    this.getData();
  }

  // 获取数据
  getData = (payload) => {
    this.setState({loading: true});
    this.props.dispatch({
      type: 'lineEditModel/getData',
      payload,
      callback: (data) => {
        let stateTemp = {loading: false};
        this.setState(stateTemp);
      },
    });
  };

  // // 删除表格数据
  // delAdData = (payload) => {
  //   this.setState({loading: true});
  //   this.props.dispatch({
  //     type: 'lineEditModel/delAd',
  //     payload,
  //     callback: (value) => {
  //       this.setState({loading: false});
  //       if (checkError(value)) {
  //         this.getAdData();
  //       }
  //     },
  //   });
  // };
  //
  // //添加表格数据
  // addAdData = (payload, callback) => {
  //   const {status, modalDataObj} = this.state;
  //   this.props.dispatch({
  //     type: 'lineEditModel/addAd',
  //     payload: checkEdit(status, modalDataObj, payload),
  //     callback: (value) => {
  //       let success = false;
  //       if (checkError(value)) {
  //         this.getAdData();
  //         success = true;
  //       }
  //       callback(success);
  //     },
  //   });
  // };


  // 搜索面板值
  onSearchPannel = (param) => {
    // this.getAdData({...param});
  };

  // 展示弹框
  onShowModal = (status, record) => {
    this.setState({visible: true, status, modalDataObj: record});
  };

  // 修改分页
  // onChangePage = (data) => {
  //   const searchObj = this.child.getSearchValue();
  //   // 获取分页数据
  //   this.getAdData({...getPageParam(data), ...searchObj});
  // };

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
      editable: true,
      inputType: 'Input',
      conAttr: {
        message: '请输入文本',
        placeholder: '请输入文本',
        required: true,
      },
    },

    {
      title: '下拉',
      dataIndex: 'select',
      key: 'select',
      editable: true,
      inputType: 'Select',
      conAttr: {
        message: '请选择下拉',
        placeholder: '请选择下拉',
        data: ['select1', 'select2'],
        required: true,
      },

    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      editable: true,
      inputType: 'Date',
      conAttr: {
        message: '请选择日期',
        placeholder: '请选择日期',
        required: true,
      },
      render: text => string2Moment(text),
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      editable: true,
      inputType: 'TimePicker',
      conAttr: {
        message: '请选择时间',
        placeholder: '请选择时间',
        required: true,
        ruleTime:'HH:mm:ss',
      },
      // render: text => string2Moment(text),
    },
    {
      title: '数字',
      dataIndex: 'number',
      key: 'number',
      editable: true,
      inputType: 'InputNumber',
      conAttr: {
        required: true,
        message: '请输入数字',
        placeholder: '请输入数字',
      },
    },
    {
      title: '下拉参照',
      dataIndex: 'canzao',
      key: 'canzao',
      editable: true,
      inputType: 'ConSelectPromise',
      conAttr: {  // 表单属性
        mode: "multiple",
        url: `/admin/role/queryRoleTreeForGrant`,
        required: true,
        message: '下拉参照',
        // onSelect:(value)=>{
        //   console.log("下拉参照valuevaluevalue",value)
        // }
      },
      render: (text, record) => {
        // return <ConTableTag data={record.canzaoname}/>
        return record.canzaoname
      },
    },
    {
      title: '多文本',
      dataIndex: 'textarea',
      key: 'textarea',
      editable: true,
      inputType: 'TextArea',
      conAttr: {
        required: true,
        message: '请输入多文本',
        placeholder: '请输入多文本',
        height: 32,
      },

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
    const {mainData} = this.props.lineEditModel;

    // const {pageIndex, total, pageSize, rows} = adData;
    console.log("mainDatamainData", mainData)

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
            <Button onClick={this.onShowModal.bind(this, 'add')}>添加</Button>
            <Button onClick={this.onShowModal.bind(this, 'add')}>删除</Button>
          </div>

          <ConEditTable
            columns={this.columns}
            dataSource={mainData.rows}
            rowKey="id"
            onSave={(data) => {
              console.log("data", data);
            }}
          />
        </Spin>
      </div>
    );
  }
}

export default ProductAd;
