import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'

import { handleAsyncAction } from '$src/modules/actions'

import {
  fetchUserAsync,
  logout
} from '$act/account'

export default combineReducers({
  user: handleAsyncAction(fetchUserAsync, {
    otherHandlers: {
      [logout]: state => ({
        ...state,
        completed: true,
        data: null,
        error: null,
      })
    }
  }),
  loggedIn: handleActions(
    {
      [fetchUserAsync.requested]: () => false,
      [fetchUserAsync.success]: () => true,
      [fetchUserAsync.error]: () => false,
      [logout]: () => false,
    },
    false
  ),
})