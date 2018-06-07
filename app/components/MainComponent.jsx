import React from 'react'
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;
import { Row, Col } from 'antd';
import SidebarMenu from './SidebarMenu'
import QuanlyNPP from './Tables/QuanlyNPP'
import QuanlyKho from './Tables/QuanlyKho'
import QuanlyCat from './Tables/QuanlyCate'

class MainComponent extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    return(
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div style={{color: '#fff', textAlign: 'center', padding: '10px 0'}} className="logo" >
            <img style={{width: '50%'}} src="./images/logo.png"/>
          </div>
          <SidebarMenu/>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <div style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
            <QuanlyNPP/>
            <QuanlyKho/>
            <QuanlyCat/>
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default MainComponent