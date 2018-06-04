import React from 'react'
import { 
  Table, Input, Select, 
  Popconfirm, Form, Row, 
  Col, Button, message
} from 'antd';

const data = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     ma_npp: i.toString(),
//     name: `Công ty TNHH ${i}`,
//     phone: `0969996669`,
//     address: `London Park no. ${i}`,
//     rank: 'b',
//   });
// }
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'select') {
      return (
        <Select placeholder="Chọn xếp hạng">
          <Select.Option value="A">A</Select.Option>
          <Select.Option value="B">B</Select.Option>
          <Select.Option value="C">C</Select.Option>
          <Select.Option value="D">D</Select.Option>
        </Select>
      )
    }
    return <Input />;
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Hãy nhập dữ liệu ô ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                    
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [], 
      editingKey: '' 
    };
    this.columns = [
      {
        title: 'Mã NPP',
        dataIndex: 'ma_npp',
        width: '10%',
        editable: true,
      },
      {
        title: 'Tên',
        dataIndex: 'name',
        //width: '15%',
        editable: true,
      },
      {
        title: 'Địa chỉ',
        dataIndex: 'address',
        //width: '40%',
        editable: true,
      },
      {
        title: 'Điện thoại',
        dataIndex: 'phone',
        //width: '40%',
        editable: true,
      },
      {
        title: 'Xếp hạng',
        dataIndex: 'ranking',
        //width: '40%',
        editable: true,
      },
      {
        title: 'Actions',
        dataIndex: 'operation',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.key)}
                        style={{ marginRight: 8 }}
                      >
                        Lưu
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Bạn thật sự muốn huỷ?"
                    onConfirm={() => this.cancel(record.key)}
                  >
                    <a href="javascript:;">Huỷ</a>
                  </Popconfirm>
                </span>
              ) : (
                <React.Fragment>
                  <a href="javascript:;" onClick={() => this.edit(record.key)}>Sửa</a>  
                  {" | "}
                  <Popconfirm
                    title="Bạn thật sự muốn xoá?"
                    okType="danger"
                    onConfirm={() => this.delete(record)}
                  >
                    <a href="javascript:;">Xoá</a>  
                  </Popconfirm>
                </React.Fragment>
                
              )}
            </div>
          );
        },
      },
    ];
  }
  addNewRow() {
    let rowItem = this.getDefaultFields();
    rowItem = {
      ...rowItem,
      key: this.state.data.length + 1
    };
    this.setState({
      data: this.state.data.concat(rowItem),
      editingKey: rowItem.key
    })
  }
  getDefaultFields() {
    return {
      ma_npp: 'VB',
      name: "Duc Tuan",
      address: "Thanh Phu, Lao Cai",
      phone: "0909090909",
      ranking: 'b',
    };
  }
  isEditing = (record) => {
    return record.key === this.state.editingKey;
  };
  edit(key) {
    this.setState({ editingKey: key });
  }
  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        //console.log(item, row);//update to server here
        let newItemData = {
          ...item,
          ...row,
        };
        fetch(ISD_BASE_URL + 'updateNpp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newItemData)
        })
        .then((response) => {
          return response.json()
        }).then((json) => {
          if(json.status == 'error') {
            message.error(json.message, 3);
          } else {
            //udate table state
            newData.splice(index, 1, {
              ...newItemData
            });
            this.setState({ data: newData, editingKey: '' });
            message.success(json.message);
          }
        }).catch((ex) => {
          console.log('parsing failed', ex)
          message.error('Có lỗi xảy ra trong quá trình lưu hoặc chỉnh sửa!');
        });
        //End up data to server
      } else {
        newData.push(data);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }
  cancel = () => {
    this.setState({ editingKey: '' });
  };
  delete = (record) => {
    console.log(record);
  };
  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    /**
      title?: React.ReactNode;
      key?: string;
      dataIndex?: string;
      render?: (text: any, record: T, index: number) => React.ReactNode;
      filters?: { text: string; value: string }[];
      onFilter?: (value: any, record: T) => boolean;
      filterMultiple?: boolean;
      filterDropdown?: React.ReactNode;
      sorter?: boolean | ((a: any, b: any) => number);
      colSpan?: number;
      width?: string | number;
      className?: string;
      fixed?: boolean | ('left' | 'right');
      filteredValue?: any[];
      sortOrder?: boolean | ('ascend' | 'descend');
    */
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'ranking' ? 'select' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <React.Fragment>
        <div className="table-operations">
          <Row>
            <Col span={12}>
              <h2 className="head-title">Quản lý nhà phân phối</h2>
            </Col>
            <Col span={12}>
              <div className="action-btns">
                <Button 
                  onClick={() => this.addNewRow()}
                  type="primary" icon="plus">Thêm mới</Button>
              </div>
            </Col>
          </Row>
        </div>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
        />
      </React.Fragment>
    );
  }
}

export default EditableTable