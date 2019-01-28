import { connect } from 'react-redux'

import Topbar from '$comp/nav/Topbar'
import { openSidebar } from '$act/sidebar'
import { doLogout } from '$act/account'
import { setLocale } from '$act/app'

const mapStateToProps = state => ({
  locale: state.app.locale,
  loggedIn: state.account.loggedIn,
  user: state.account.user.data,
})

const mapDispatchToProps = dispatch => ({
  openSidebar: () => dispatch(openSidebar()),
  logout: () => dispatch(doLogout()),
  setLocale: locale => dispatch(setLocale({ locale }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)