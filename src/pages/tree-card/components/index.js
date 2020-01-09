import React from 'react';
import { connect } from 'dva';
import {  Modal, Tree,  Spin, Form, Row, Col } from 'antd';
import ConInput from 'components/ConInput';
import ConTreeLoading from 'components/ConTreeLoading';
import styles from './index.less';


@Form.create()
class OperationShangpinfenlei extends React.Component {
  state = {

    loading: false,
    modalDataObj: {}, //  弹框数据
  };


  onSelectTree = (data) => {
    this.setState({ modalDataObj: data[0] });
  };

  onLoading = (loading) => {
    this.setState({ loading });
  };


  render() {
    const { loading, modalDataObj } = this.state;

    const { form } = this.props;
    const formItemLayout = {
      labelCol: { sm: { span: 10 }, xs: { span: 10 }, md: { span: 5 } },
      wrapperCol: { sm: { span: 14 }, xs: { span: 10 }, md: { span: 19 } },
    };

    console.log("modalDataObjmodalDataObjmodalDataObj",modalDataObj)

    return (
      <Spin spinning={loading}>
        <div className="tree-card">
          <div className="left-tree">
            <ConTreeLoading
              url='/admin/shangpinfenlei/getByPid'
              treeTitle='mingcheng'
              treeCode='bianhao'
              treeId='id'
              // onRef={ref => this.cTree = ref}
              onSelect={this.onSelectTree}
              onLoading={this.onLoading}
            />
          </div>


          <Form
            className="right-card"
            // onSubmit={this.handleSearch}
          >
            <Row gutter={24}>
              <Col xs={24} sm={24} md={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="mingcheng"
                  label="名称"
                  // defValue={modalDataObj.mingcheng}
                  disabled={true}
                />

              </Col>

              <Col xs={24} sm={24} md={12}>
                <ConInput
                  form={form}
                  formItemLayout={formItemLayout}
                  id="bianhao"
                  label="编号"
                  // defValue={modalDataObj.bianhao}
                  disabled={true}
                />

              </Col>
            </Row>
          </Form>
        </div>
      </Spin>
    );

  }
}

export default OperationShangpinfenlei;
