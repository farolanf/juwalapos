import React from 'react'
import PropTypes from 'prop-types'

import Drawer from '@material-ui/core/Drawer'

const Sidebar = ({ open, closeSidebar }) => (
  <Drawer open={open} onClose={closeSidebar}>
    Menu
  </Drawer>
)

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  closeSidebar: PropTypes.func.isRequired,
}

export default Sidebar