/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import {connect} from 'dva';

import {Button, Table, Icon} from 'antd';
import styles from './index.less';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

@connect((state) => ({
  common: state.common,
}))

class basic extends React.Component {

  state = {
    loading: false,
  };


  columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];


  render() {

    return (
      <div className={styles.basic}>
        <Table dataSource={dataSource} columns={this.columns}/>
      </div>

    );
  }
}

export default basic;

