import React from 'react'
import Layout from '$comp/layout'

import { FormattedMessage } from 'react-intl'

const ProfilePage = () => {
  return (
    <Layout>
      <FormattedMessage
        id='profile.greeting'
        defaultMessage='Hello, you have {count, plural,
          one {an email}
          other {# emails}
        }'
        values={{ count: 1 }}
      />
    </Layout>
  )
}

export default ProfilePage