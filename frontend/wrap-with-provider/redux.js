const React = require('react')
const { Provider } = require('react-redux')
const store = require('$src/store').default

const wrapWithProvider = element => (
  <Provider store={store}>
    {element}
  </Provider>
)

module.exports = wrapWithProvider