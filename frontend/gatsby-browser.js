/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

 // init store
 
const store = require('$src/store').default
const { initAuthorization, loadToken } = require('$src/modules/auth')
const { loadLocale } = require('$src/modules/app')
const { fetchUser } = require('$act/account')
const { setLocale } = require('$act/app')

initAuthorization()
loadToken() && store.dispatch(fetchUser())
loadLocale() && store.dispatch(setLocale({ locale: loadLocale() }))

const wrapWithProvider = require('./wrap-with-provider')

module.exports = {
  wrapRootElement: wrapWithProvider
}