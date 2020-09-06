import React, { Component } from 'react'
import { Table, Space, Button } from 'antd';
import { getHome } from '../../actions/home'
import { connect } from 'react-redux'
import Forms from '../../components/forms'
class Home extends Component {
  state = {
    selectedRowKeys: [],
    flag:false,
    vale:{},
    txt:'添加'
  };
  clear=()=>{
    this.setState({
      flag:false,
      vale:{},
      txt:'添加'
    })
  }
  componentDidMount() {
    this.props.getHome({ limit: 20, page: 1 })
  }
  onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
  eait=(val)=>{
    this.setState({
      flag:true,
      vale:val,
      txt:'编辑'
    })
  }
  render() {
    const {selectedRowKeys,flag,txt,vale}=this.state
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
        render: (text, item) => {
          return (
            <Space>
              <Button>
                详情
              </Button>
              <Button onClick={()=>this.eait(item)}>
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
          <Forms flag={flag} vale={vale} txt={txt} clear={this.clear} />
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
