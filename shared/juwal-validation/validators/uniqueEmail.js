const axios = require('axios')

module.exports = function(email, options) {
  return new Promise(function(resolve, reject) {
    if (options.url) {
      axios.post(options.url, { email })
        .then(res => {
          res.data.ok ? resolve() : resolve('^Email sudah terdaftar')
        })
        .catch(error => {
          reject(new Error(error.message))
        })
    } else if (options.apos) {
      options.apos.users.safe.findOne({ email }, function(err, user) {
        if (err) {
          return reject(new Error(err))
        }
        user ? resolve('^Email sudah terdaftar') : resolve()
      })
    } else {
      throw new Error('Missing url|apos option')
    }
  })
}