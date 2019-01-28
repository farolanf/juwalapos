export default theme => ({
  maxWidth: '100%',
  [theme.breakpoints.up('lg')]: {
    maxWidth: theme.breakpoints.values.lg
  },
})