/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import {DatePicker, Form} from 'antd';
import moment from 'moment';

import styles from './index.less';

@Form.create()

class ConDate extends React.Component {

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
      label = '',
      id = 'date',
      message = '请选择日期',
      placeholder = '请选择日期',
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
            initialValue: defValue ? moment(defValue) : null,
            rules: [{required, message}],
          })(
            <DatePicker disabled={disabled} style={{width: '100%'}} placeholder={placeholder}/>,
          )}
        </Form.Item>
      </div>
    );
  }
}

export default ConDate;
