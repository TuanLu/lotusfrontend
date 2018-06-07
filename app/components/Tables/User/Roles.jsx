import React from 'react'
import { TreeSelect } from 'antd';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

const treeData = [{
  label: 'Quản lý nhà phân phối',
  value: 'npp',
  key: 'npp',
  children: [
    {
      label: 'Thêm NPP',
      value: 'addNpp',
      key: 'addNpp',
    },
    {
      label: 'Sửa NPP',
      value: 'updateNpp',
      key: 'updateNpp',
    },
    {
      label: 'Xoá NPP',
      value: 'deleteNPP',
      key: 'deleteNPP',
    },
  ],
}, {
  label: 'Quản lý KHSX',
  value: 'qlsx',
  key: 'qlsx',
  children: [
    {
      label: 'Thêm KHSX',
      value: 'addQlsx',
      key: 'addQlsx',
    }, 
    {
      label: 'Sửa KHSX',
      value: 'editQlsx',
      key: 'editQlsx',
    }, 
    {
      label: 'Xoá KHSX',
      value: 'deleteQlsx',
      key: 'deleteQlsx',
    }
  ],
}];

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selectedRoles || [],
    }
  }
  onChange = (value) => {
    this.setState({ value });
    if(this.props.onChange) {
      this.props.onChange(value);
    }
  }
  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      searchPlaceholder: 'Hãy chọn quyền',
      style: {
        width: 300,
      },
    };
    return <TreeSelect {...tProps} />;
  }
}

export default Demo