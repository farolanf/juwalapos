import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import { withStyles } from '@material-ui/core/styles'

import Topbar from '$con/nav/Topbar'
import Sidebar from '$con/nav/Sidebar'
import Footer from '$comp/nav/Footer'

import containerStyle from '$styles/container'

const styles = theme => ({
  root: {
    margin: '0 auto',
    ...containerStyle(theme)
  }
})

const Layout = ({ classes, children }) => {
  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title,
              author
            }
          }
        }
      `}
      render={data => (
        <div className={classes.root}>
          <Topbar title={data.site.siteMetadata.title} />
          <Sidebar />
          {children}
          <Footer />
        </div>
      )}
    />
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Layout)
