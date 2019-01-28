import { takeLatest } from 'redux-saga/effects'

import { setLocale } from '$act/app'
import { saveLocale } from '$src/modules/app'

function saveLocaleWorker (action) {
  saveLocale(action.payload.locale)
}

function* saga () {
  yield takeLatest(setLocale, saveLocaleWorker)
}

export default saga