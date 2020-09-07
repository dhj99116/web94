import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { NavLink, withRouter } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Sec extends Component {
  state = {
    list: []
  }
  componentDidMount(){
    let newArr=[]
    newArr.push(this.props.location.pathname)
    this.setState({
      list:newArr
    })
  }
  fun1 = (val) => {
    let newListd = this.state.list
    if (!newListd.includes(val)) {
      newListd.push(val)
    }
    this.setState({
      list: newListd
    })
  }
  fun2=(val)=>{
    let listd=this.state.list
    console.log(this.props)
    let {pathname}=this.props.location
    let newData
    if(listd.length>1){
      newData=listd.filter(v=>{
      return v!==val
    })
    this.setState({
      list:newData
    })
    if(val===pathname){
      this.props.history.push(newData[newData.length-1])
    }
    }
    
    
    
  }
  render() {
    const {list} =this.state
    let pathname=this.props.location.pathname
    if(pathname==='/'){
      pathname='/home'
    }
    console.log(pathname)
    return (
      <Layout style={{ width: '100%', height: '100%' }}>
        <Header className="header">
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            <Menu.Item key="1">nav 1</Menu.Item>
            <Menu.Item key="2">nav 2</Menu.Item>
            <Menu.Item key="3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={[pathname]}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" icon={<UserOutlined />} title="首页">
                <Menu.Item key="/home">
                  <NavLink to='/home' onClick={() => this.fun1('/home')}>评委管理</NavLink>
                 
                </Menu.Item>
                <Menu.Item key="/about">
                  <NavLink to='/about' onClick={() => this.fun1('/about')}>赛事管理</NavLink>
                  
                </Menu.Item>
                <Menu.Item key="/list">
                  <NavLink to='/list' onClick={() => this.fun1('/list')}>参赛管理</NavLink>
              
                </Menu.Item>
                <Menu.Item key="4">option4</Menu.Item>
              </SubMenu>
              <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <div className='topp'>
                {
                  list.map((v,i)=>{
                    let a=v.split('')
                    a.shift()
                    a=a.join('')
                    return (
                      <div key={v}>
                      {a}
                        <span onClick={() => this.fun2(v)} className={list.length>1?'':'zhe1'}>X</span>
                      </div>
                    )
                  })
                }
              </div>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>



    )
  }
}
export default withRouter(Sec)