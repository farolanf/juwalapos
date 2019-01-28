import React from 'react'
import Layout from '$comp/layout'

import Alert from '$comp/Alert'

const UnconfirmedPage = () => {
  return (
    <Layout>
      <Alert variant='error' message='Welcome, please confirm your email.' />
    </Layout>
  )
}

export default UnconfirmedPage