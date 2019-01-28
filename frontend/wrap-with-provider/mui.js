const React = require('react')
const CssBaseline = require('@material-ui/core/CssBaseline').default
const { MuiThemeProvider } = require('@material-ui/core/styles')

const theme = require('$src/theme').default

require('typeface-roboto')

const wrapWithProvider = element => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    {element}
  </MuiThemeProvider>
)

module.exports = wrapWithProvider