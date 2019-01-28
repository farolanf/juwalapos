import React from 'react'
import PropTypes from 'prop-types'

import AppBar from '@material-ui/core/AppBar'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = {
  root: tw`p-20`
}

const Footer = ({ classes }) => {
  const year = new Date().getFullYear()
  return (
    <AppBar color='primary' position='static' classes={classes}>
      <Typography variant='h5' color='inherit' gutterBottom>
        JUWAL
      </Typography>
      <Typography color='inherit'>
        Copyright &copy; {year} juwal.id
      </Typography>
    </AppBar>
  )
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer)