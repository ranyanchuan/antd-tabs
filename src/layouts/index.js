import React from 'react';
import {connect} from 'dva';
import router from 'umi/router';
import queryString from 'query-string';
import {Layout, Menu, Tabs, Icon, Badge, Dropdown, Avatar} from 'antd';
import {tree2Map} from 'utils';

import styles from './index.less';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const {TabPane} = Tabs;

@connect((state) => ({
  commonModel: state.commonModel,
}))

class BasicLayout extends React.Component {

  state = {
    collapsed: false,
    activeKey: 'index',
    panes: {
      index: {title: '首页', code: 'index', closable: false},
    },
    menuInitArray:[],
  }

  menuMap=null;


  componentDidMount() {
    this.getMenu();
  }

  // 获取菜单
  getMenu = (payload = {}) => {
    this.props.dispatch({
      type: 'commonModel/getMenuTree',
      payload,
      callback: (menuInitArray) => {
        // todo 获取菜单
        this.setState({menuInitArray});
        this.menuMap = tree2Map(menuInitArray, 'code');

        // 打开默认标签
        const {pathname} = this.props.location;
        const url = pathname.replace('/', '');
        let activeKey = url ? url : 'index';
        this.openTab(activeKey, this.menuMap[activeKey]);

      },
    });
  }



  onCollapse = collapsed => {
    this.setState({collapsed});
  };

  onChangeTab = (activeKey) => {
    this.setState({activeKey});
    this.goRouter(activeKey); // 路由跳转
  }

  goRouter = (activeKey) => {
    const url = activeKey !== 'index' ? activeKey : '';
    router.push(`/${url}`);
  }


  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };


  onClickLeftMenu = (data) => {
    const {key, item} = data;
    if (item.props) {
      const {dataRef} = item.props;
      this.openTab(key, dataRef)
    }
  }

  openTab = (key, item) => {
    let result = {activeKey: key};
    let {panes} = this.state;
    panes[key] = item;
    result.panes = panes;
    this.setState(result);
    this.goRouter(key);
  }


  remove = targetKey => {
    let {panes} = this.state;
    if (targetKey !== 'index') {
      let proCode = 'index';
      let isFound = false;

      for (let index in panes) {
        const {code} = panes[index];
        if (isFound) {
          proCode = code;
          isFound = false;
          break;
        }
        if (code === targetKey) {
          isFound = true;
        }
        if (!isFound) {
          proCode = code;
        }
      }

      delete  panes[targetKey];
      this.setState({panes, activeKey: proCode});
      this.goRouter(proCode); // 路由跳转
    }

  };


  // 构建左边menu
  renderMenu = (menuInitArray) => {
    return menuInitArray.map(item => {
      const {code, children, title, icon} = item;
      if (children && children.length > 0) {
        return (
          <SubMenu
            key={code}
            title={
              <span>
                  <Icon type={icon}/>
                  <span>{title}</span>
              </span>
            }
          >
            {this.renderMenu(children)}
          </SubMenu>
        )
      } else {
        return (
          <Menu.Item key={code} dataRef={item}>
            <Icon type={icon}/>
            <span>{title}</span>
          </Menu.Item>
        )
      }
    })
  }


  //
  getTabPane = (panes) => {
    let result = [];
    for (let index in panes) {
      const {code, closable, title} = panes[index];
      let tabTiltle = <span style={{marginRight: 5}}>{title}</span>
      result.push(
        <TabPane tab={tabTiltle} key={index} closable={closable}/>)
    }
    return result;
  }


  render() {

    const {collapsed, activeKey, panes,menuInitArray} = this.state;
    // 用户信息
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={this.onShowPassModal}>
          <Icon type="lock"/>&nbsp;&nbsp;修改密码&nbsp;&nbsp;&nbsp;&nbsp;
        </Menu.Item>
        <Menu.Item key="2" onClick={this.onShowPhoneModal}>
          <Icon type="mobile"/>&nbsp;&nbsp;修改手机&nbsp;&nbsp;&nbsp;&nbsp;
        </Menu.Item>
        <Menu.Item key="3" onClick={this.onLogout}>
          <Icon type="logout"/>&nbsp;&nbsp;退出登录&nbsp;&nbsp;&nbsp;&nbsp;
        </Menu.Item>
      </Menu>
    );

    return (

      <div className={styles.basicLayout}>

        <Layout style={{minHeight: '100vh'}}>
          {/*左边菜单*/}
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
            className={styles.sider}
          >
            <div className={styles.logo}>
              <a href="">
                <img
                  src="http://design.yonyoucloud.com/static/tinper-bee/images/favicon.png"
                  alt="logo"/>
                {!collapsed && <h1>用友网络</h1>}

              </a>
            </div>
            <Menu
              theme="dark"
              defaultSelectedKeys={[activeKey]}
              selectedKeys={[activeKey]}
              onClick={this.onClickLeftMenu}
              mode="inline">
              {this.renderMenu(menuInitArray)}
            </Menu>
          </Sider>


          {/*右边内容*/}
          <Layout>
            <Header className={styles.header}>
              <div>
                <Icon
                  className={styles.trigger}
                  type={collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={() => {
                    this.setState({
                      collapsed: !collapsed,
                    })
                  }}
                />
              </div>
              <div className={styles.right}>
                <Menu
                  // theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['xx']}
                  selectedKeys={['xx']}
                  style={{lineHeight: '64px'}}
                  // onClick={this.onClickNavMenu}
                >
                  <Menu.Item key='bell'>
                    <Badge count={10} onClick={this.onLinkMessage}>
                      <Icon type="bell" className={styles.message}/>
                    </Badge>
                  </Menu.Item>
                  <Menu.Item key='user' style={{padding: 0}}>
                    <Dropdown overlay={menu} placement="bottomCenter">
                    <span>
                    <Icon type="user"/>
                      川川
                    </span>
                    </Dropdown>
                  </Menu.Item>
                </Menu>
              </div>
            </Header>

            {/*内容*/}
            <Content style={{margin: '0 16px'}}>
              <Tabs
                hideAdd
                onChange={this.onChangeTab}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
                // style={{height:38}}
                className={styles.tabPage}
                // size="small"
              >
                {panes && this.getTabPane(panes)}
              </Tabs>
              <div className={styles.tabContent}>
                {this.props.children}
              </div>

            </Content>
            <Footer style={{textAlign: 'center'}}>用友网络 ©2018 Created by yonyou</Footer>
          </Layout>
        </Layout>
      </div>

    );
  }
}

export default BasicLayout;


