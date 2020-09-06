import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import reducer from './reducer'
import promise from 'redux-promise'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
let reducers = combineReducers(reducer)
let store = createStore(reducers, composeEnhancers(applyMiddleware(promise)))
export default store