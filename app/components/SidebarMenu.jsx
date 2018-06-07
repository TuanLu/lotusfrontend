import React from 'react'
import { Menu, Icon, Button } from 'antd';

const SubMenu = Menu.SubMenu;

class SidebarMenu extends React.Component {
  renderMenuItem() {
    let {mainState} = this.props;
    let menuItems = mainState.userRoles.map((role, index) => {
      return (
        <Menu.Item key={index}>
            <Icon type={role.icon} />
            <span>{role.label}</span>
        </Menu.Item>
      );
    });
    return menuItems;
  }
  render() {
    return (
      <div>
        <Menu
          defaultSelectedKeys={['0']}
          mode="inline"
          theme="dark"
        >
         {this.renderMenuItem()}
        </Menu>
      </div>
    );
  }
}

export default SidebarMenu