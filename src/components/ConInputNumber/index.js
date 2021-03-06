/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import {Form, InputNumber} from 'antd';

@Form.create()

class ConInputNumber extends React.Component {
  render() {
    const {
      formItemLayout,
      defValue,
      disabled,
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
      min,
      max,
      formItemStyle,
      formItemClass,
    } = this.props;
    const {getFieldDecorator} = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
          style={formItemStyle}
          className={formItemClass}
        >
          {getFieldDecorator(id, {
            rules: [{required, message}],
            initialValue: defValue,
          })(
            <InputNumber
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              style={{width: '100%'}}
            />,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConInputNumber;
