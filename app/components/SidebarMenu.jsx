import React from 'react'
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

class SidebarMenu extends React.Component {
  render() {
    return (
      <div>
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>QL Nhà phân phối</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>QL Nhà cung cấp</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>QL Kho hàng</span>
          </Menu.Item>
          <SubMenu key="dmsp" title={<span><Icon type="mail" /><span>Danh mục sản phẩm</span></span>}>
            <Menu.Item key="vt">Vật tư</Menu.Item>
            <Menu.Item key="vl">Nguyên vật liệu</Menu.Item>
            <Menu.Item key="hc">Hóa chất</Menu.Item>
            <Menu.Item key="btp">Bán thành phẩm</Menu.Item>
            <Menu.Item key="tp">Thành phẩm</Menu.Item>
          </SubMenu>
          <SubMenu key="kho" title={<span><Icon type="appstore" /><span>Quản lý kho</span></span>}>
            <SubMenu key="knl" title="Kho nguyên liệu">
              <Menu.Item key="a">Kệ A</Menu.Item>
              <Menu.Item key="b">Kệ B</Menu.Item>
            </SubMenu>
            <SubMenu key="kvt" title="Kho vật tư">
              <Menu.Item key="a">Kệ A</Menu.Item>
              <Menu.Item key="b">Kệ B</Menu.Item>
            </SubMenu>
            <SubMenu key="ktp" title="Kho thành phẩm">
              <Menu.Item key="a">Kệ A</Menu.Item>
              <Menu.Item key="b">Kệ B</Menu.Item>
            </SubMenu>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}

export default SidebarMenu