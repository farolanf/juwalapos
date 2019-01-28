import { combineReducers } from 'redux'
import app from './app'
import account from './account'
import sidebar from './sidebar'

export default combineReducers({
  app,
  account,
  sidebar,
})