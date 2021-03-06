import React from 'react';

import { Form, Row, Col, Input, Button } from 'antd';
import ConDate from 'components/ConDate';
import ConInput from 'components/ConInput';
import ConAutoSelect from 'components/ConAutoSelect';


import styles from './index.less';


@Form.create()


class LogisticsSearch extends React.Component {

  componentDidMount() {
    // 在父组件上绑定子组件方法
    this.props.onRef(this);
  }


  handleSearch = (e) => {
    e.preventDefault();
    const param = this.getSearchValue();
    this.props.onSearch(param);
  };


  // 获取表单内容
  getSearchValue = () => {
    const param = {};
    this.props.form.validateFields((err, values) => {
      for (const key in values) {
        if (values[key] && Array.isArray(values[key]) && values[key].length === 0) {
          break;
        }

        if (values[key]) {
          param[key] = values[key];
        }
      }
    });
    return param;
  };


  handleReset = () => {
    this.props.form.resetFields();
  };


  render() {
    const { form } = this.props;
    const formItemLayout = {
      labelCol: { sm: { span: 4 } },
      wrapperCol: { sm: { span: 19 } },
    };
    const { getFieldDecorator } = form;
    return (
      <div className={styles.basketballSearch}>
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>

            <Col span={6}>
              <ConAutoSelect
                form={form}
                formItemLayout={formItemLayout}
                id="domain"
                label="种类"
                placeholder="请选择种类"
                data={['电视机', '洗衣机', '冰箱']}
              />
            </Col>


            <Col span={6}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="model"
                label="型号"
                placeholder="请输入编号"
              />
            </Col>

            <Col span={6}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="title"
                label="名称"
                placeholder="请输入名称"
              />
            </Col>


            <Col span={6}>
              <ConDate
                id="createTime"
                label="购买日期"
                placeholder="请选择购买日期"
                form={form}
                formItemLayout={formItemLayout}
              />
            </Col>

            <Col span={6}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="name"
                label="名字"
                placeholder="请选输入名字"
              />
            </Col>


            <Col span={6}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="phone"
                label="手机号"
                placeholder="请输入手机号"
              />
            </Col>

            <Col span={6}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="card"
                label="身份证号"
                placeholder="请输入身份证号"
              />
            </Col>


            <Col span={6}>

              <ConAutoSelect
                form={form}
                formItemLayout={formItemLayout}
                id="town"
                label="居住镇"
                placeholder="请输入居住镇"
                data={['客田镇']}
              />
            </Col>

            <Col span={6}>
              <ConAutoSelect
                form={form}
                formItemLayout={formItemLayout}
                id="village"
                label="居住村"
                placeholder="请选择居住村"
                data={['客田村', '百合村']}
              />
            </Col>

            <Col span={6}>
              <ConAutoSelect
                form={form}
                formItemLayout={formItemLayout}
                id="group"
                label="居住组"
                placeholder="请选择居住组"
                data={['杨家村组']}

              />
            </Col>


          </Row>


          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
            </Col>
          </Row>

        </Form>
      </div>
    );
  }
}

export default LogisticsSearch;
