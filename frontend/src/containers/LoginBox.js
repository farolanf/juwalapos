import { connect } from 'react-redux'

import LoginBox from '$comp/LoginBox'
import { fetchUser } from '$act/account'

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser())
})

export default connect(null, mapDispatchToProps)(LoginBox)