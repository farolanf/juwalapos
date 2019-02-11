import validate from 'validate.js'
import _ from 'lodash'

const options = {
  presence: {
    allowEmpty: false,
    message: '^Harus diisi'
  },
  email: {
    message: '^Harus berupa alamat email'
  },
  length: {
    tooShort: '^Minimal %{count} karakter',
    tooLong: '^Maksimal %{count} karakter'
  },
  equality: {

  }
}

_.each(validate.validators, (validator, name) => {
  if (options[name]) {
    validator.options = options[name]
  }
})

export default validate