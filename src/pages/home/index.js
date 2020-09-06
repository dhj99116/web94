import React, { Component } from 'react'
import {getHome} from '../../actions/home'
import { connect } from 'react-redux'
import Forms from '../../components/forms'
class Home extends Component {
  componentDidMount(){
    this.props.getHome({limit:20,page:1})
  }
  render() {
    return (
      <div className='wrap'>
        <div className='top'>
          <Forms />
        </div>
      </div>
    )
  }
}
export default connect(
  ({home})=>({home}),
  {
    getHome
  }
)(Home)
