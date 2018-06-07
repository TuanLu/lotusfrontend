import React from 'react'
import { Icon } from 'antd';

export default class Loading extends React.Component {
  render() {
    return (
      <Icon
        style={{ 
          fontSize: 46, 
          color: '#08c',
          width: '100%',
          ...this.props.style
        }} 
        type="loading"/>
    )    
  }
}