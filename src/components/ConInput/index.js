/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Input } from 'antd';

@Form.create()

class ConInput extends React.Component {
  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue = '',
      type,
      disabled,
      form,
      required = false,
      label,
      id,
      message,
      placeholder,
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
          })(
            <Input placeholder={placeholder} disabled={disabled} type={type}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConInput;
