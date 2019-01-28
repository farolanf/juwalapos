const React = require('react')
const { connect } = require('react-redux')
const { addLocaleData, IntlProvider } = require('react-intl')
const en = require('react-intl/locale-data/en')
const id = require('react-intl/locale-data/id')

const enMessages = require('$prj/translations/en.json')
const idMessages = require('$prj/translations/id.json')

const messages = {
  'en-US': enMessages,
  'id-ID': idMessages,
}

addLocaleData([...en, ...id])

const mapStateToProps = state => ({
  locale: state.app.locale
})

const ProviderWrapper = connect(mapStateToProps)(
  ({ locale, children }) => (
    <IntlProvider
      locale={locale}
      defaultLocale={locale}
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  )
)

const wrapWithProvider = element => (
  <ProviderWrapper>
    {element}
  </ProviderWrapper>
)

module.exports = wrapWithProvider