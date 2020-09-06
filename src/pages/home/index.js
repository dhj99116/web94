import React, { Component } from 'react'
import { Table, Space, Button } from 'antd';
import {listPost} from '../../serives/api'
import { getHome,setHome} from '../../actions/home'
import { connect } from 'react-redux'
import Forms from '../../components/forms'
class Home extends Component {
  state = {
    selectedRowKeys: [],
    flag:false,
    vale:{},
    txt:'添加',
    count:'',
    data:[],
    info:{name:'',types:'',title:''},
    cont:false
  };
  clear=()=>{
    this.setState({
      flag:false,
      vale:{},
      txt:'添加'
    })
  }
   async componentDidMount() {
    
    const count1=await listPost({limit:30,page:1})
    console.log(count1)
    this.setState({
      count:count1.data.result.list.length
    })
    await this.props.getHome({ limit: 3, page: 1 })
    const {data}=this.props.home
    let datas=JSON.parse(JSON.stringify(data))
    this.setState({
      data:datas
    })
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
  changeFn=(page,pageSize)=>{
    console.log(page,pageSize)
    this.props.getHome({limit:3,page:page})
    const {data}=this.props.home
    let datas=JSON.parse(JSON.stringify(data))
    this.setState({
      data:datas
    })
  }
  fn1=()=>{
    const {data}=this.props.home
    let dataList=JSON.parse(JSON.stringify(data))
    const {selectedRowKeys}=this.state
   
    let info=[]
    for(let i=0;i<dataList.length;i++){
      for(let j=0;j<selectedRowKeys.length;j++){
        if(dataList[i].id===selectedRowKeys[j]){
          info.push(dataList[i])
          dataList.splice(i,1)
          break
        }
      }
      let newList=info.concat(dataList)
      this.props.setHome(newList)
    }
  }
  fn2=()=>{
    this.props.setHome(this.state.data)
  }
  infoFn=(val)=>{
    this.setState({
      cont:true,
      info:val
    })
    console.log(val)
  }
  render() {
    const {selectedRowKeys,flag,txt,vale,count,info,cont}=this.state
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
              <Button onClick={()=>this.infoFn(item)}>
                详情
              </Button>
              <Button onClick={()=>this.eait(item)} disabled={selectedRowKeys.includes(text)}>
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
      <div className={cont===true?'zhe':'zhe1'}>
        <div>
          赛事名称:{info.name}
        </div>
        <div>
          所属赛事:{info.title}
        </div>
        <div>
          赛事类型:{info.types}
        </div>
        <div>
          <Button onClick={()=>{this.setState({cont:false})}}>退出</Button>
        </div>
      </div>
        <div className='top'>
        <Button type='primary' onClick={this.fn1}>排序</Button>
        <Button onClick={this.fn2}>取消</Button>
          <Forms flag={flag} vale={vale} txt={txt} clear={this.clear} />
        </div>
        <div className='sec'>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={this.props.home.data}
            rowKey='id'
            pagination={{
              pageSize:3,
              total:count,
              onChange:this.changeFn
            }}
          />
        </div>
        <div>{selectedRowKeys.length}条</div>
      </div>
    )
  }
}
export default connect(
  ({ home }) => ({ home }),
  {
    getHome,
    setHome
  }
)(Home)
