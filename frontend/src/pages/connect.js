import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import url from 'url'

import Layout from '$comp/layout'

import { saveToken, loginRedirect } from '$src/modules/auth'

const ConnectPage = ({ fetchUser }) => {
  const urlObj = url.parse(window.location.href, true)

  useEffect(() => {
    saveToken(urlObj.query.token)
    fetchUser()
    loginRedirect()
  }, [])

  return (
    <Layout>
      Initializing session...
    </Layout>
  )
}

ConnectPage.propTypes = {
  fetchUser: PropTypes.func.isRequired,
}

export default ConnectPage