import { connect } from 'react-redux'

import ConnectPage from '$src/pages/connect'
import { fetchUser } from '$act/account'

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser())
})

export default connect(null, mapDispatchToProps)(ConnectPage)