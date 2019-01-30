import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { navigate } from '@reach/router'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'

import { API_HOST } from '$src/const'
import { login, register, loginRedirect } from '../modules/auth';

import Alert from '$comp/Alert'

const styles = () => ({
  buttonIcon: tw`text-xl mr-2`
})

const LoginBox = ({ open, onClose, fetchUser, classes }) => {
  const [errorMessage, setErrorMessage] = useState('')

  const [mode, setMode] = useState('login')
  const otherMode = mode === 'login' ? 'register' : 'login'

  useEffect(() => {
    if (open) {
      setErrorMessage('')
      setMode('login')
    }
  }, [open])

  function toggleMode () {
    setMode(otherMode)
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  async function handleSubmit (e) {
    e.preventDefault()
    setErrorMessage('')
    if (mode === 'login') {
      await login(email, password)
        .catch(err => {
          err.response && setErrorMessage(err.response.data.message)
        })
      onClose()
      fetchUser()
      loginRedirect()
    } else if (mode === 'register') {
      await register(email, email, password)
        .catch(err => {
          err.response && setErrorMessage(err.response.data.message)
        })
      onClose()
      fetchUser()
      navigate('/welcome/unconfirmed')
    }
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth='xs'>
      <DialogTitle>
        {mode === 'login' ? (
          <FormattedMessage id='login' defaultMessage='Login' />
        ) : (
          <FormattedMessage id='register' defaultMessage='Register' />
        )}
        {errorMessage && <Alert variant='error' message={errorMessage} style={tw`mt-3 mb-0`} />}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container>
            <Grid item xs={12}>
              <TextField
                label='Email'
                placeholder='Email address'
                fullWidth
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type='password'
                label='Password'
                placeholder='Enter password'
                fullWidth
                margin='normal'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Grid>
            {mode === 'register' && (
              <Grid item xs={12}>
                <TextField
                  type='password'
                  label='Password confirm'
                  placeholder='Confirm password'
                  fullWidth
                  margin='normal'
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                />
              </Grid>
            )}
          </Grid>
          <Grid container spacing={8}>
            <Grid item xs={12} style={tw`mt-6`}>
              <Typography variant='button'>
                <FormattedMessage
                  id='login.with'
                  defaultMessage='Or login with'
                />
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant='contained'
                color='secondary'
                href={API_HOST + '/auth/facebook/login'}
              >
                <FontAwesomeIcon icon={faFacebook} className={classes.buttonIcon} />
                Facebook
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant='contained'
                color='secondary'
                href={API_HOST + '/auth/google/login'}
              >
                <FontAwesomeIcon icon={faGoogle} className={classes.buttonIcon} />
                Google
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button color='primary' onClick={onClose}>
            <FormattedMessage id='cancel' defaultMessage='Cancel' />
          </Button>
          <Button color='primary' onClick={toggleMode}>
            {mode === 'login' ? (
              <FormattedMessage id='register' defaultMessage='Register' />
            ) : (
              <FormattedMessage id='login' defaultMessage='Login' />
            )}
          </Button>
          <Button variant='contained' color='primary' type='submit'>
            {mode === 'login' ? (
              <FormattedMessage id='login' defaultMessage='Login' />
            ) : (
              <FormattedMessage id='register' defaultMessage='Register' />
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

LoginBox.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchUser: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginBox)