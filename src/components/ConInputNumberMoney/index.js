import React from 'react';
import { Form, InputNumber } from 'antd';

@Form.create()

class ConInputNumberMoney extends React.Component {
  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue=null,
      disabled,
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
      min,
      max,
      formatter = /\B(?=(\d{3})+(?!\d))/g,
      parser = /￥\s?|(,*)/g,
      precision,
      onChange,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue,
            onChange,
          })(
            <InputNumber
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              precision={precision}
              formatter={value => `￥ ${value}`.replace(formatter, ',')}
              parser={value => value.replace(parser, '')}
              style={{ width: '100%' }}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConInputNumberMoney;
