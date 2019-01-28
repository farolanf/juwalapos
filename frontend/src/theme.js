import { createMuiTheme } from '@material-ui/core/styles'
import deepPurple from '@material-ui/core/colors/deepPurple'
import indigo from '@material-ui/core/colors/indigo'
import red from '@material-ui/core/colors/red'
import blue from '@material-ui/core/colors/blue'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: indigo,
    secondary: deepPurple,
    error: red,
    info: blue,
    success: green,
    warning: amber,
  },
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: 'white'
      }
    }
  }
})

console.log(theme)

export default theme