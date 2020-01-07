/* eslint-disable import/first */
/**
 * Created by ranyanchuan on 2018/3/11.
 */
import React from 'react';
import { connect } from 'dva';
import { Carousel, Form } from 'antd';
import Header from 'components/header/index';
import Footer from 'components/footer/index';

import lun01 from 'assets/img/lun01.jpg';
import lun02 from 'assets/img/lun02.jpg';
import lun03 from 'assets/img/lun03.jpg';
import a01 from 'assets/img/a01.jpg';
import a02 from 'assets/img/a02.jpg';
import a03 from 'assets/img/a03.jpg';
import a04 from 'assets/img/a04.png';

import styles from './index.less';


class Retail extends React.Component {

  render() {

    return (
      <div className={styles.retail}>
        <Header/>
        <div className={styles.new}>
          <Carousel autoplay>
            <div><img src={lun01} alt=""/>
            </div>
            <div><img src={lun02} alt=""/>
            </div>
            <div><img src={lun03} alt=""/>
            </div>
          </Carousel>
        </div>
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


          <div className={styles.iconItem}>
            <img src={a04} alt=""/>
            <div className={styles.goTitle}>
              <a href="/user">客户信息</a>
            </div>
          </div>

        </div>
        <Footer/>
      </div>
    );
  }
}

export default Retail;
