import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import url from 'url'

import Layout from '$comp/layout'

import { connect, loginRedirect } from '$src/modules/auth'

const ConnectPage = ({ fetchUser }) => {
  const urlObj = url.parse(window.location.href, true)
  
  useEffect(() => {
    connect(urlObj.query.provider, window.location.search)
      .then(() => {
        fetchUser()
        loginRedirect()
      })
  }, [])
  
  return (
    <Layout>
      Connecting to {urlObj.query.provider}
    </Layout>
  )
}

ConnectPage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
}

export default ConnectPage