import { handleActions } from 'redux-actions'

import { setLocale } from '$act/app'

const initialState = {
  locale: 'en-US',
}

export default handleActions(
  {
    [setLocale]: (state, { payload: { locale }}) => ({ ...state, locale })
  },
  initialState
)