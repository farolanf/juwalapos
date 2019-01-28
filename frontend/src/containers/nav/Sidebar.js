import { connect } from 'react-redux'
import Sidebar from '$comp/nav/Sidebar'
import { closeSidebar } from '$act/sidebar'

const mapStateToProps = state => ({
  open: state.sidebar.open
})

const mapDispatchToProps = dispatch => ({
  closeSidebar: () => dispatch(closeSidebar()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)