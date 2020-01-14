import React from "react";
import {Table, Input, InputNumber, Popconfirm, Form, Divider, Icon, Tooltip} from 'antd';
import ConInput from 'components/ConInput';
import ConSelect from 'components/ConSelect';
import ConDate from 'components/ConDate';
import ConTextArea from 'components/ConTextArea';
import ConInputNumber from 'components/ConInputNumber';
import ConSelectPromise from 'components/ConSelectPromise';

import styles from './index.less';


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
      selectData = [], // 下拉选项
      textAreaHeight = 30, // 文本编辑默认高
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
            // formItemStyle={{margin: 0, paddingBottom: 10, paddingTop: 10}}
            formItemClass={styles.editFromCon}
            placeholder={placeholder}
          />),
        'InputNumber': (
          <ConInputNumber
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            required={required}
            message={message}
            formItemClass={styles.editFromCon}
            placeholder={placeholder}
          />),
        "Select": (
          <ConSelect
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            required={required}
            message={message}
            formItemClass={styles.editFromCon}
            placeholder={placeholder}
            data={selectData}
          />
        ),
        "Date": (
          <ConDate
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            required={required}
            message={message}
            formItemClass={styles.editFromCon}
            placeholder={placeholder}
          />
        ),
        "TextArea": (
          <ConTextArea
            form={form}
            id={dataIndex}
            defValue={record[dataIndex]}
            required={required}
            message={message}
            formItemClass={styles.editFromCon}
            placeholder={placeholder}
            height={textAreaHeight}
          />
        ),
        "ConSelectPromise": (
          <ConSelectPromise
            mode="multiple"
            form={form}
            // optionId='id'
            // optionTitle='title'
            isLoadingData={true}
            id={dataIndex}
            defValue={record[dataIndex]}
            url={`/admin/role/queryRoleTreeForGrant`}
            required={required}
            message={message}
            formItemClass={styles.editFromCon}
          />
        ),

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
    this.state = {
      data: [],
      editingKey: ''
    };
  }


  componentDidMount() {
    const {dataSource} = this.props;
    this.setState({data: dataSource});
  }

  componentWillReceiveProps(nextProps) {
    const {dataSource} = nextProps;
    if (JSON.stringify(dataSource) !== JSON.stringify(this.props.dataSource)) {
      this.setState({data: dataSource});
    }
  }


  action = {
    title: '操作',
    dataIndex: 'operation',
    render: (text, record) => {

      const {rowKey = 'id'} = this.props;

      const {editingKey} = this.state;
      const editable = this.isEditing(record);

      return editable ? (
        <span>
              <EditableContext.Consumer>
                {form => (
                  <a onClick={() => this.save(form, record[rowKey])}>保存</a>
                )}
              </EditableContext.Consumer>
               <Divider type="vertical"/>
              <Popconfirm
                title="确定取消吗?"
                okText="确定"
                cancelText="取消"
                onConfirm={() => this.cancel(record[rowKey])}
              >
                <a>取消</a>
              </Popconfirm>
            </span>
      ) : (
        <span>
            <a disabled={editingKey !== ''} onClick={() => this.edit(record[rowKey])}>编辑</a>
            <Divider type="vertical"/>
            <a disabled={editingKey !== ''} onClick={() => this.edit(record[rowKey])}>删除</a>
            </span>
      );
    },
  }

  // 判断当前行为行编辑
  isEditing = (record) => {
    const {rowKey = 'id'} = this.props;
    return record[rowKey] === this.state.editingKey
  };

  cancel = () => {
    this.setState({editingKey: ''});
  };

  save(form, key) {

    const {rowKey = 'id'} = this.props;

    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item[rowKey]);
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

      // todo 走后端 api
      console.log("newDatanewData", newData[index]);

    });
  }

  edit(key) {
    this.setState({editingKey: key});
  }

  render() {

    const {data} = this.state;
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    let columns = this.props.columns.map(col => {
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

    columns.push(this.action);
    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
          size={'small'}
          scroll={{x: 'max-content'}}
        />
      </EditableContext.Provider>
    );
  }
}

export default Form.create()(EditableTable);
