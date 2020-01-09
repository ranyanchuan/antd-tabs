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

const menuInitArray = [
  {
    code: 'index',
    title: '首页',
    icon: 'home',
    closable: false
  },
  {
    title: '统计分析',
    code: 'dashboard',
    icon: 'dashboard',
    children: [
      {
        code: 'pie-chart',
        title: '饼图',
        icon: 'pie-chart',
      },
      {
        code: 'bar-chart',
        title: '条形图',
        icon: 'bar-chart',
      },
      {
        code: 'radar-chart',
        title: '雷达图',
        icon: 'radar-chart',
      },
      {
        code: 'scatter-chart',
        title: '散点图',
        icon: 'dot-chart',
      }
    ],
  },
  {
    code: 'single-table',
    title: '单表查询',
    icon: 'table',
  },
  {
    code: 'line-edit',
    title: '行内编辑',
    icon: 'number',
  },
  {
    code: 'main-children',
    title: '一主多子',
    icon: 'cluster',
  },
  {
    code: 'tree-card',
    title: '左树右卡',
    icon: 'layout',
  },
  {
    code: 'tree-table',
    title: '左树右表',
    icon: 'pic-right',
  },
  {
    title: '供应商系统',
    code: 'carry-out',
    icon: 'carry-out',
    children: [
      {title: '基础', code: 'basic', icon: 'bars',},
      {title: '入库', code: 'inbound', icon: 'import',},
      {title: '出库', code: 'outbound', icon: 'export',},
      {title: '物流', code: 'logistics', icon: 'car',},
    ],
  },
]


let menuMap = tree2Map(menuInitArray, 'code');

@connect((state) => ({
  commonModel: state.commonModel,
}))

class BasicLayout extends React.Component {

  state = {
    collapsed: false,
    activeKey: 'index',
    panes: {
      index: {title: '首页', code: 'index', closable: false},
    }
  }


  componentDidMount() {
    const {pathname} = this.props.location;
    const url = pathname.replace('/', '');
    let activeKey = url ? url : 'index';
    this.openTab(activeKey, menuMap[activeKey]);
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

    const {collapsed, activeKey, panes} = this.state;
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


            <Content style={{margin: '0 16px'}}>

              <Tabs
                hideAdd
                onChange={this.onChangeTab}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
                // style={{height:38}}
                className={styles.tabPage}
                size="small"
              >
                {panes && this.getTabPane(panes)}
              </Tabs>
              <div className={styles.tabContent}>
                {this.props.children}
              </div>

            </Content>
            <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </div>

    );
  }
}

export default BasicLayout;


