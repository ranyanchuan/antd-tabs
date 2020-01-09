import {Table, Input, InputNumber, Popconfirm, Form, Divider, Icon, Tooltip} from 'antd';

import ConInput from 'components/ConInput';
import ConInputNumber from 'components/ConInputNumber';

import React from "react";

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableContext = React.createContext();

class EditableCell extends React.Component {

  renderCell = (form) => {
    const {
      editing,
      dataIndex,
      title,
      inputType = 'Input',
      record,
      index,
      children,
      message,
      required,
      placeholder,
      ...restProps
    } = this.props;

    let componentObj = null;
    if (editing) {
      componentObj = {
        'Input': (
          <ConInput
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            required={required}
            message={message}
            formItemStyle={{margin: 0, paddingBottom: 10, paddingTop: 10}}
            placeholder={placeholder}
          />),
        'InputNumber': (
          <ConInputNumber
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            required={required}
            message={message}
            formItemStyle={{margin: 0, paddingBottom: 10, paddingTop: 10}}
            placeholder={placeholder}
          />),

      }
    }


    return (
      <td {...restProps}>
        {editing ? componentObj[inputType] : children}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}


class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data, editingKey: ''};
    this.columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        width: '25%',
        inputType: 'Input',
        editable: true,
        message: '请输入姓名',
        placeholder: '请输入姓名',
        required: true,
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: '15%',
        editable: true,
        message: '请输入年龄',
        inputType: 'InputNumber',
        placeholder: '请输入年龄',
        required: true,

      },
      {
        title: '地址',
        dataIndex: 'address',
        width: '40%',
        editable: true,
        message: '请输入地址',
        placeholder: '请输入地址',
        required: false,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => {
          const {editingKey} = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a onClick={() => this.save(form, record.key)}>保存</a>
                )}
              </EditableContext.Consumer>
               <Divider type="vertical"/>
              <Popconfirm
                title="确定取消吗?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => this.cancel(record.key)}
              >
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>编辑</a>
            <Divider type="vertical"/>
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>查看</a>
            </span>
          );
        },
      },
    ];
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({editingKey: ''});
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({data: newData, editingKey: ''});
      } else {
        newData.push(row);
        this.setState({data: newData, editingKey: ''});
      }
    });
  }

  edit(key) {
    this.setState({editingKey: key});
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          ...col,
          record,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          size={'small'}
        />
      </EditableContext.Provider>
    );
  }
}

export default Form.create()(EditableTable);
