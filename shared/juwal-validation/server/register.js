const validate = require('../validate')

module.exports = function(options) {
  return {
    email: {
      presence: true,
      email: true,
      uniqueEmail: {
        apos: options.uniqueEmail.apos
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 3,
        maximum: 20
      }
    }
  }
}