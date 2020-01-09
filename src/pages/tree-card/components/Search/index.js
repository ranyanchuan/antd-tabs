import React from 'react';
import { Form, Row, Col, Button } from 'antd';
import ConDate from 'components/ConDate';
import ConInput from 'components/ConInput';
import styles from './index.less';

@Form.create()
class Search extends React.Component {
  state = {
    expand: false,
  };

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
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { sm: { span: 8 } },
      wrapperCol: { sm: { span: 16 } },
    };
    return (
      <div className="search-body">
        <Form
          className="ant-advanced-search-form"
          onSubmit={this.handleSearch}
        >
          <Row gutter={24}>
            <Col span={8}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="mingcheng"
                label="名称"
                placeholder="请输入名称"
              />
            </Col>
            <Col span={8}>
              <ConInput
                form={form}
                formItemLayout={formItemLayout}
                id="bianhao"
                label="编号"
                placeholder="请输入编号"
              />
            </Col>
            {/*<Col span={8}>*/}
              {/*<ConInput*/}
                {/*form={form}*/}
                {/*formItemLayout={formItemLayout}*/}
                {/*id="pid"*/}
                {/*label="上级分类"*/}
                {/*placeholder="请输入上级分类"*/}
              {/*/>*/}
            {/*</Col>*/}
          </Row>
          <Row>
            <Col span={24} className="search-footer">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default Search;
