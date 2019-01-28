import { all } from 'redux-saga/effects'
import app from './app'

function* rootSaga () {
  yield all([
    app(),
  ])
}

export default rootSaga