import React from 'react';
import { Form, Modal, Row, Col } from 'antd';

import ConInput from 'components/ConInput';
import ConSelect from 'components/ConSelect';
import ConWebsite from 'components/ConWebsite';

const ruleDate = 'YYYY-MM-DD HH:mm:ss';

import { footer } from 'utils';
const titleObj = {
  add: '添加APP版本管理信息',
  edit: '编辑APP版本管理信息',
  desc: '查看APP版本管理信息',
};

@Form.create()

class ActionModal extends React.Component {

  //  关闭添加信息弹框
  hideModal = () => {
    this.props.onClose();
    this.props.form.resetFields();
  };

  //  提交form信息弹框
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {

      const { status } = this.props;
      if (status === 'desc') {
        this.onClickClose();
        return;
      }
      if (!err) {
        this.props.onSave(fieldsValue);
        this.hideModal();
      }
    });
  };

  render() {
    const { visible, form, status, basicData = {} } = this.props;
    //label 和输入框比例
    const formItemLayout = {
      labelCol: { sm: { span: 6 } },
      wrapperCol: { sm: { span: 16 } },
    };
    const disabled = (status === 'desc') ? true : false;

    return (
      <Modal
        title={titleObj[status]}
        visible={visible}
        onOk={this.handleSubmit}
        onCancel={this.hideModal}
        maskClosable={false}
        okText="确认"
        cancelText="取消"
         {...footer(disabled)}
        width="960px"
      >
        <Form onSubmit={this.handleSubmit}>
          <Row>

            <Col span={12}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="version"
                label="版本号"
                placeholder="请输入版本号"
                defValue={basicData.version}
                required={true}
                disabled={disabled}
                message={'请输入版本号'}
              />
            </Col>

            <Col span={12}>
              <ConWebsite
                form={form}
                formItemLayout={formItemLayout}
                id="url"
                label="URL"
                placeholder="请输入URL"
                defValue={basicData.url}
                required={true}
                disabled={disabled}
                message={'请输入URL'}
              />
            </Col>
            <Col span={12}>
              <ConSelect
                form={form}
                formItemLayout={formItemLayout}
                id="type"
                label="类型"
                placeholder="请选择类型"
                data={[
                  { id: '', value: '请选择' },
                  { id: '0', value: 'IOS' },
                  { id: '1', value: 'ANDROID' },
                ]}
                optionKey={'id'}
                optionValue={'value'}
                required={true}
                disabled={disabled}
                defValue={basicData.type ? basicData.type.toString() : null}
              />
            </Col>
            <Col span={12}>
              <ConSelect
                form={form}
                formItemLayout={formItemLayout}
                id="isupdate"
                label="强制更新"
                placeholder="请选择是否强制更新"
                data={[
                  { id: '', value: '请选择' },
                  { id: '0', value: '否' },
                  { id: '1', value: '是' },
                ]}
                disabled={disabled}
                defValue={basicData.isupdate ? basicData.isupdate.toString() : null}
              />
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

export default ActionModal;
