import axios from 'axios'
import { navigate } from '@reach/router'

import { API_HOST } from '$src/const'

export const saveToken = token => {
  localStorage.setItem('token', token)
  initAuthorization()
}

export const clearToken = () => {
  localStorage.removeItem('token')
  initAuthorization()
}

export const loadToken = () => localStorage.getItem('token')

export const storeReferer = () => {
  const url = window.location.pathname + window.location.search
  localStorage.setItem('referer', url)
}

export const loadReferer = () => localStorage.getItem('referer')

export const connect = (provider, search) => {
  const url = `${API_HOST}/auth/${provider}/callback${search}`
  return axios
    .get(url)
    .then(res => {
      saveToken(res.data.jwt)
    })
    // eslint-disable-next-line
    .catch(console.log)
}

export const register = (username, email, password) => {
  return axios
    .post(API_HOST + '/auth/local/register', {
      username,
      email,
      password,
    })
    .then(res => {
      saveToken(res.data.jwt)
    })
}

export const login = (email, password) => {
  return axios
    .post(API_HOST + '/auth/local', {
      identifier: email,
      password,
    })
    .then(res => {
      saveToken(res.data.jwt)
    })
}

export const loginRedirect = () => {
  const referer = loadReferer()
  navigate(referer && referer !== '/' ? referer : process.env.GATSBY_HOME)
}

export const initAuthorization = () => {
  const token = loadToken()
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}