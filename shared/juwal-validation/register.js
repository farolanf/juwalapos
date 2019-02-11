import validate from './validate'

export default {
  email: {
    presence: true,
    email: true
  },
  password: {
    presence: true,
    length: {
      minimum: 3,
      maximum: 20
    }
  },
  passwordConfirm: {
    presence: true,
    equality: 'password'
  }
}