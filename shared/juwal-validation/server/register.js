const validate = require('../validate')

module.exports = {
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
  }
}