/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import a01 from 'assets/img/a01.jpg';
import a02 from 'assets/img/a02.jpg';
import a03 from 'assets/img/a03.jpg';

import styles from './index.less';

class Retail extends React.Component {

  componentDidMount() {
    console.log("index componentDidMount");
  }

  render() {

    return (
      <div className={styles.iconContent}>

        <div className={styles.iconItem}>
          <img src={a01} alt=""/>
          <div className={styles.goTitle}>
            <a href="/inbound">采购信息</a>
          </div>
        </div>

        <div className={styles.iconItem}>
          <img src={a02} alt=""/>
          <div className={styles.goTitle}>
            <a href="/outbound">销售信息</a>

          </div>
        </div>

        <div className={styles.iconItem}>
          <img src={a03} alt=""/>
          <div className={styles.goTitle}>
            <a href="/logistics">物流信息</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Retail;
