// import React from 'react';
//
// import { Form, Row, Col, Input, Button, Select } from 'antd';
// import { formatFormDateRange } from 'utils';
// import ConInput from 'components/ConInput';
// import ConSelect from 'components/ConSelect';
// import ConRangePicker from 'components/ConRangePicker';
//
// import styles from './index.less';
// import moment from 'moment';
//
// @Form.create()
//
// class Search extends React.Component {
//   state = {};
//
//   componentDidMount() {
//     // 在父组件上绑定子组件方法
//     this.props.onRef(this);
//   }
//
//
//   handleSearch = (e) => {
//     e.preventDefault();
//     const param = this.getSearchValue();
//     this.props.onSearch(param);
//   };
//
//
//   // 获取表单内容
//   getSearchValue = () => {
//     let param = {};
//     this.props.form.validateFields((err, values) => {
//
//       for (const key in values) {
//         if (values[key]) {
//           param[key] = values[key];
//         }
//       }
//       param = formatFormDateRange(param, ['starttime', 'endtime'], 'YYYY-MM-DD 00:00:00');
//     });
//     return param;
//   };
//
//
//   handleReset = () => {
//     this.props.form.resetFields();
//   };
//
//
//   render() {
//
//     const { form } = this.props;
//
//     const formItemLayout = {
//       labelCol: { sm: { span: 8 } },
//       wrapperCol: { sm: { span: 16 } },
//     };
//
//
//     return (
//       <div className="search-body">
//         <Form
//           className="ant-advanced-search-form"
//           onSubmit={this.handleSearch}
//         >
//
//           <Row gutter={24}>
//             <Col span={8}>
//               <ConInput
//                 form={form}
//                 formItemLayout={formItemLayout}
//                 id="text"
//                 label="标题"
//                 placeholder="请输入标题"
//               />
//
//             </Col>
//
//             <Col span={8}>
//               <ConSelect
//                 form={form}
//                 formItemLayout={formItemLayout}
//                 id="bannertype"
//                 label="下拉"
//                 placeholder="请选择下拉"
//                 data={['下拉1', '下拉2']}
//               />
//             </Col>
//
//             {/*日期区间*/}
//             <Col span={8}>
//               <ConRangePicker
//                 form={form}
//                 formItemLayout={formItemLayout}
//                 id="date"
//                 label="日期"
//               />
//             </Col>
//           </Row>
//
//           <Row>
//             <Col span={24} className="search-footer">
//               <Button type="primary" htmlType="submit">查询</Button>
//               <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     );
//   }
// }
//
// export default Search;
