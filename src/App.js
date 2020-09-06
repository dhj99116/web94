import React from 'react';
import { Route, Redirect, Switch, BrowserRouter } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/login'
import About from './pages/about'
import List from './pages/list'
import Reg from './pages/reg'
import Sec from './components/Sec'

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='box'>
        <BrowserRouter>
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/reg' component={Reg} />
            <Route path='/' render={() => {
              if (!localStorage.getItem('token')) {
                return <Redirect to='/login' />

              }
              return (
                <Sec>
                  <Switch>
                    <Route path='/home' component={Home} />
                    <Route path='/list' component={List} />
                    <Route path='/about' component={About} />
                    <Redirect from='/' to='/home' />
                  </Switch>
                </Sec>
              )
            }} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default App;
