const axios = require('axios')

module.exports = function(email, options) {
  return new Promise(function(resolve, reject) {
    axios.post(options.url, { email })
      .then(res => {
        res.data.ok ? resolve() : resolve('^Email sudah terdaftar')
      })
      .catch(error => {
        reject(new Error(error.message))
      })
  })
}