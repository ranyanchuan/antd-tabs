import React from 'react';
import { Form, Modal, Row, Col, Spin } from 'antd';

import ConInput from 'components/ConInput';
import ConTreeSelectLoading from 'components/ConTreeSelectLoading';

import { footer, changeSelectVal } from 'utils';

import styles from './index.less';
import { connect } from 'dva';

const titleObj = {
  add: '添加商品分类',
  edit: '编辑商品分类',
};

@Form.create()

@connect((state) => ({
  operationShangpinfenleiModel: state.operationShangpinfenleiModel,
}))

class ActionModal extends React.Component {

  state = {
    confirmLoading: false,
  };

  componentWillReceiveProps(nextProps) {
    const { basicData } = nextProps;
    if (basicData.pid !== this.props.basicData.pid) {
      const { pid, mingcheng } = basicData;
      this.setState({ pid, mingcheng });
    }
  }

  //  关闭添加信息弹框
  hideModal = (status) => {
    if (status) {
      this.props.form.resetFields();
      this.props.onClose();
    }
    this.setState({ confirmLoading: false });
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (!err) {
        this.setState({ confirmLoading: true });
        const { id } = this.childMenu.getTreeSelect();
        fieldsValue.pid = id || '0';
        this.props.onSave(fieldsValue, this.hideModal);
      }
    });
  };


  // 树懒加载方法转换
  changeTreeData = (data) => {
    return data.map((item) => {
      const { pid, id, mingcheng, hasChild } = item;
      let treeItem = { id, pId: pid, value: id, title: mingcheng };
      if (!hasChild) {
        treeItem.isLeaf = true;
      }
      return treeItem;
    });
  };


  render() {
    const { visible, form, status, basicData = {} } = this.props;
    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 18 } },
    };

    const { confirmLoading } = this.state;
    const disabled = (status === 'desc') ? true : false;

    return (
      <Modal
        title={titleObj[status]}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        confirmLoading={confirmLoading}
        maskClosable={false}
        okText="确认"
        cancelText="取消"
        {...footer(disabled)}
        width="400px"
      >
        <Spin spinning={confirmLoading}>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="mingcheng"
                  defValue={basicData.mingcheng}
                  label="名称"
                  placeholder="请输入名称"
                  required={true}
                  disabled={disabled}
                  message={'请输入名称'}
                />
              </Col>
              <Col span={24}>
                <ConTreeSelectLoading
                  form={form}
                  treeOptionId='id'
                  treeOptionPid='pid'
                  treeOptionTitle='mingcheng'
                  treeOptionCode='bianhao'
                  id="pid"
                  label="父级菜单"
                  url="/admin/shangpinfenlei/getByPid"
                  defValue={changeSelectVal(basicData.mingcheng, basicData.bianhao)}
                  placeholder="请选择父级菜单"
                  message={'请选择父级菜单'}
                  disabled={disabled}
                  onRef={ref => this.childMenu = ref}
                />
              </Col>

            </Row>
            {/*<Row>*/}


            {/*<ConInput*/}
            {/*form={form}*/}
            {/*formItemLayout={formItemLayout}*/}
            {/*id="bianhao"*/}
            {/*defValue={basicData.bianhao}*/}
            {/*label="编号"*/}
            {/*placeholder="请输入编号"*/}
            {/*disabled={true}*/}
            {/*message={'请输入编号'}*/}
            {/*/>*/}
            {/**/}
            {/*<Col span={12}>*/}

            {/**/}

            {/*<ConTreeSelectLoading*/}
            {/*form={form}*/}
            {/*id="pid"*/}
            {/*label="父级菜单"*/}
            {/*url="/admin/shangpinfenlei/getByPid"*/}
            {/*defValue={basicData.pid != '0' ? basicData.pid : ''}*/}
            {/*changeTreeData={this.changeTreeData}*/}
            {/*/>*/}
            {/*</Col>*/}

            {/*</Row>*/}
          </Form>
        </Spin>
      </Modal>
    );
  }
}

export default ActionModal;
