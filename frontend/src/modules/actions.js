import { createAction, handleActions } from 'redux-actions'
import changeCase from 'change-case'

export const createAsyncAction = name => ({
  requested: createAction(changeCase.constantCase(name) + '_REQUESTED'),
  success: createAction(changeCase.constantCase(name) + '_SUCCESS'),
  error: createAction(changeCase.constantCase(name) + '_ERROR'),
})

export const asyncHandlers = (asyncAction, handlers = {}) => ({
  [asyncAction.requested]: (state, action) => ({
    ...state,
    completed: false,
    data: null,
    error: null,
    ...(handlers[asyncAction.requested]
      ? handlers[asyncAction.requested](state, action) 
      : {}),
  }),
  [asyncAction.success]: (state, action) => ({
    ...state,
    completed: true,
    data: action.payload.data,
    error: null,
    ...(handlers[asyncAction.success]
      ? handlers[asyncAction.success](state, action) 
      : {}),
  }),
  [asyncAction.error]: (state, action) => ({
    ...state,
    completed: true,
    data: null,
    error: action.payload,
    ...(handlers[asyncAction.error]
      ? handlers[asyncAction.error](state, action) 
      : {}),
  })
})

export const handleAsyncAction = (asyncAction, options = {}) => {
  options = Object.assign(
    {
      handlers: {},
      otherHandlers: {},
      initialState: {
        completed: true,
        data: null,
        error: null,
      }
    },
    options)

  return handleActions(
    {
      ...asyncHandlers(asyncAction, options.handlers),
      ...options.otherHandlers,
    },
    options.initialState
  )
}