import React, { Component } from 'react'
import { Table, Space, Button } from 'antd';
import { getHome } from '../../actions/home'
import { connect } from 'react-redux'
import Forms from '../../components/forms'
class Home extends Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
  };
  componentDidMount() {
    this.props.getHome({ limit: 20, page: 1 })
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  render() {
    const columns = [
      {
        title: '赛事名称',
        dataIndex: 'name',
      },
      {
        title: '赛事类型',
        dataIndex: 'title',
      },
      {
        title: '赛事级别',
        dataIndex: 'types',
      },
      {
        title: '操作',
        dataIndex: 'id',
        render:(text,item)=>{
          return(
            <Space>
              <Button>
                详情
              </Button>
              <Button>
                编辑
              </Button>
              <Button>
                删除
              </Button>
            </Space>
          )
        }
      },
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          key: 'odd',
          text: 'Select Odd Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
        {
          key: 'even',
          text: 'Select Even Row',
          onSelect: changableRowKeys => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            this.setState({ selectedRowKeys: newSelectedRowKeys });
          },
        },
      ],
    };
    return (
      <div className='wrap'>
        <div className='top'>
          <Forms />
        </div>
        <div className='sec'>
        <Table 
        rowSelection={rowSelection} 
        columns={columns} 
        dataSource={this.props.home.data} 
        rowKey='id'
        />
        </div>
      </div>
    )
  }
}
export default connect(
  ({ home }) => ({ home }),
  {
    getHome
  }
)(Home)
