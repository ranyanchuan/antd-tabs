/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { Form, Input } from 'antd';
const { TextArea } = Input;

@Form.create()

class ConTextArea extends React.Component {
  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 3 } },
        wrapperCol: { sm: { span: 21 } },
      },
      defValue=null,
      disabled,
      form,
      required = false,
      height=210,
      label='',
      id="abstract",
      message,
      placeholder,
      formItemStyle,
      formItemClass,
    } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div>
        <Form.Item
          {...formItemLayout}
          label={label}
          style={formItemStyle}
          className={formItemClass}
        >
          {getFieldDecorator(id, {
            rules: [{ required, message }],
            initialValue: defValue,
          })(
            <TextArea style={{ height }} disabled={disabled} placeholder={placeholder}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTextArea;
