import React from 'react'
import {connect} from 'react-redux'
import { Layout, Menu, Icon, Button } from 'antd';
const { Header, Sider, Content } = Layout;
import { Row, Col } from 'antd';
import SidebarMenu from './SidebarMenu'
import QuanlyNPP from './Tables/QuanlyNPP'
import UserManagement from './Tables/UserManagement'
import LoginForm from './LoginForm'
import {getTokenHeader} from 'ISD_API'
import {updateStateData} from 'actions'

class MainComponent extends React.Component {
  state = {
    collapsed: false,
    logged: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  componentWillMount() {
    let token = localStorage.getItem('ISD_TOKEN');
    if(token != "" && token != null) {
      fetch(ISD_BASE_URL + 'fetchRoles', {
        headers: getTokenHeader()   
      })
      .then((response) => response.json())
      .then((json) => {
        if(json.data) {
          this.props.dispatch(updateStateData({
            showLogin: false,
            userRoles: json.data,
            defaultRouter: json.data[0].path
          }));
        }
      })
      .catch((error) => {
        console.warn(error);
      });
    }
  }
  renderContent(router) {
    switch (router) {
      case 'npp':
        return <QuanlyNPP dispatch={this.props.dispatch} mainState={this.props.mainState}/>
        break;
      case 'user':
        return <UserManagement dispatch={this.props.dispatch} mainState={this.props.mainState}/>
        break;
    
      default:
        break;
    }
  }
  render() {
    let {showLogin} = this.props.mainState; 
    if(showLogin) return  <LoginForm dispatch={this.props.dispatch}/>;
    let {defaultRouter} = this.props.mainState;
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
          <SidebarMenu 
            mainState={this.props.mainState}
            dispatch={this.props.dispatch}/>
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
            {!defaultRouter? 
              <Button style={{margin: '0 auto'}} type="primary" loading>
                Đang tải dữ liệu
              </Button>
              : 
              this.renderContent('user')
            }
          </div>
        </Layout>
      </Layout>
    );
  }
}

export default connect((state) => {
  return {
    mainState: state.main.present,
  }
})(MainComponent)