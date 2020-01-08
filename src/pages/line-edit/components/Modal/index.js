// import React from 'react';
// import { Form, Modal, Row, Col, Spin, message } from 'antd';
// import moment from 'moment/moment';
//
// import { footer, changeSelectVal } from 'utils';
// import ConDate from 'components/ConDate';
// import ConInput from 'components/ConInput';
// import ConSelect from 'components/ConSelect';
// import ConTextArea from 'components/ConTextArea';
// import ConInputNumber from 'components/ConInputNumber';
// import ConSelectPromise from 'components/ConSelectPromise';
//
//
// import styles from './index.less';
//
// const ruleDate = 'YYYY-MM-DD HH:mm:ss';
//
// const titleObj = {
//   add: '添加广告信息',
//   edit: '编辑广告信息',
//   desc: '查看广告信息',
// };
//
// @Form.create()
//
// class ActionModal extends React.Component {
//
//   state = {
//     loading: false,
//   };
//
//
//   //  关闭添加信息弹框
//   hideModal = (status) => {
//     if (status) {
//       this.props.onClose();
//       this.props.form.resetFields();
//     }
//     this.setState({ loading: false });
//   };
//
//   //  提交form信息弹框
//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.props.form.validateFields((err, fieldsValue) => {
//       if (!err) {
//
//         // 日期格式
//         if (fieldsValue.date) {
//           fieldsValue.date = moment(fieldsValue.date).format(ruleDate);
//         }
//         // 获取参照
//         fieldsValue.canzao = this.childShangpin.getTreeSelect();
//         debugger
//         // this.setState({ loading: true });
//         // this.props.onSave(fieldsValue, this.hideModal);
//
//       }
//     });
//   };
//
//
//   render() {
//     const { visible, form, status, basicData = {} } = this.props;
//     const { loading } = this.state;
//     const disabled = (status === 'desc') ? true : false;
//
//     return (
//       <Modal
//         title={titleObj[status]}
//         visible={visible}
//         onOk={this.handleSubmit}
//         onCancel={this.hideModal}
//         maskClosable={false}
//         confirmLoading={loading}
//         okText="确认"
//         cancelText="取消"
//         {...footer(disabled)}
//         width="900px"
//       >
//         <Spin spinning={loading}>
//           <Form onSubmit={this.handleSubmit}>
//             <Row>
//
//               <Col span={12}>
//                 <ConInput
//                   form={form}
//                   id="input"
//                   label="文本"
//                   placeholder="请输入文本"
//                   defValue={basicData.input}
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入文本'}
//                 />
//               </Col>
//
//
//               <Col span={12}>
//                 <ConSelect
//                   form={form}
//                   id="select"
//                   label="下拉"
//                   placeholder="请选择下拉"
//                   message="请选择下拉"
//                   data={['下拉1', '下拉2']}
//                   required={true}
//                   disabled={disabled}
//                   defValue={basicData.select}
//                 />
//               </Col>
//
//               <Col span={12}>
//                 <ConDate
//                   form={form}
//                   id="date"
//                   label="日期"
//                   placeholder="请选择日期"
//                   defValue={basicData.date}
//                   required={true}
//                   disabled={disabled}
//                   message='请选择日期'
//                 />
//               </Col>
//
//               <Col span={12}>
//                 <ConInputNumber
//                   form={form}
//                   id="number"
//                   defValue={basicData.number}
//                   label="数字"
//                   min={0}
//                   placeholder="请输入数字"
//                   required={true}
//                   disabled={disabled}
//                   message={'请输入数字'}
//                 />
//               </Col>
//
//               {/*下拉参照*/}
//               <Col span={12}>
//
//                 <ConSelectPromise
//                   form={form}
//                   optionId='id'
//                   optionTitle='mingcheng'
//                   optionCode='bianhao'
//                   isLoadingData={visible}
//                   id="canzao"
//                   label="参照"
//                   defValue={changeSelectVal(basicData.mingcheng, basicData.shangpincode)}
//                   url={`/admin/gysshangpin/lookupshangpin`}
//                   disabled={disabled}
//                   placeholder={'请选择参照'}
//                   message={'请选择参照'}
//                   required={true}
//                   treeCheckable={false}
//                   showSearch={true}
//                   onRef={ref => this.childShangpin = ref}
//                 />
//               </Col>
//             </Row>
//
//             <Row>
//               <Col span={24}>
//                 <ConTextArea
//                   form={form}
//                   id="textarea"
//                   defValue={basicData.textarea}
//                   label="textarea"
//                   placeholder="请输入textarea"
//                   required={false}
//                   disabled={disabled}
//                   height={100}
//                 />
//               </Col>
//             </Row>
//
//
//           </Form>
//         </Spin>
//       </Modal>
//     );
//   }
// }
//
// export default ActionModal;
