import React from 'react'
import url from 'url'

import Layout from '$comp/layout'
import Alert from '$comp/Alert'

import { saveToken } from '$src/modules/auth'

const ConfirmedPage = () => {
  const urlObj = url.parse(window.location.href, true)
  saveToken(urlObj.query.token)
  return (
    <Layout>
      <Alert variant='success' message='Successfully confirmed your email, thank you.' />
    </Layout>
  )
}

export default ConfirmedPage