import { createStore, applyMiddleware, compose } from 'redux'
import reduxThunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import reducers from '$src/reducers'
import saga from '$src/sagas'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(reduxThunk),
    applyMiddleware(sagaMiddleware)
  )
)

sagaMiddleware.run(saga)

export default store