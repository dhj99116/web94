import React, { Component } from 'react'
import {getHome} from '../../actions/home'
import { connect } from 'react-redux'
class Home extends Component {
  componentDidMount(){
    this.props.getHome({limit:20,page:1})
  }
  render() {
    return (
      <div>
        
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
