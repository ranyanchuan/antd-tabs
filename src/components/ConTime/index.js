/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import {Form, TimePicker} from 'antd';
import moment from 'moment';

@Form.create()

class ConTime extends React.Component {
  render() {
    const {
      formItemLayout = {
        labelCol: { sm: { span: 6 } },
        wrapperCol: { sm: { span: 18 } },
      },
      defValue,
      disabled,
      form,
      required = false,
      label = "",
      id = "time",
      message = '请选择时间',
      placeholder = "请选择时间",
      formItemStyle,
      formItemClass,
      ruleTime='HH:mm'
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
            initialValue: defValue ? moment(defValue,ruleTime) : null,
            rules: [{required, message}],
          })(
            <TimePicker placeholder={placeholder} disabled={disabled} format={ruleTime} style={{width: '100%'}}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConTime;
