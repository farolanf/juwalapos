import { handleActions } from 'redux-actions'

import {
  openSidebar,
  closeSidebar
} from '$act/sidebar'

const initialState = {
  open: false
}

export default handleActions(
  {
    [openSidebar]: state => ({ ...state, open: true }),
    [closeSidebar]: state => ({ ...state, open: false }),
  },
  initialState
)