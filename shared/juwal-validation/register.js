const validate = require('./validate')

module.exports = function(options) {
  return {
    email: {
      presence: true,
      email: true,
      uniqueEmail: {
        url: options.uniqueEmail.url
      }
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
      equality: {
        attribute: 'password',
        message: '^Harus sama dengan password'
      }
    }
  }
}