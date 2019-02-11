import { useState, useEffect } from 'react'
import _ from 'lodash'
import validate from './validate'

/**
 * Perform validation on data change.
 *
 * options:
 *   schema: the validate.js schema
 *   data: the data (can be a list of data)
 *   condition: only perform validation when condition is true (default: true)
 *
 * Supply data as a list of grouped fields, so that only the grouped fields will
 * have their error messages set.
 *
 * Eg.
 *
 * data: [
 *   { email },
 *   { password, passwordConfirm }
 * ]
 *
 * This way when email changes, other fields will not have their error messages set.
 *
 * On the contrary,
 *
 * data: [
 *   { email, password, passwordConfirm }
 * ]
 *
 * will have all error messages shown even when the user change just the email field.
 *
 * @param {object} options Options
 */
export default function useValidateEffect(options) {
  options = _.defaults({
    condition: true
  }, options)

  const dataList = Array.isArray(options.data) ? options.data : [options.data]

  const [errors, setErrors] = useState({
    msg: {},
    ok: false
  })

  // This breaks hook rule: "don't run hook in a loop", but should be okay as long
  // as the dataList size never changes.
  dataList.forEach(data => {
    useEffect(() => {
      if (options.condition) {
        let newMsgs = validate(data, options.schema)
        newMsgs = _.pick(newMsgs, Object.keys(data))
        newMsgs = _.mapValues(newMsgs, val => val[0])
        const mergedMsgs = _.assign({}, errors.msg, newMsgs)
        Object.keys(data).forEach(name => {
          if (!newMsgs[name]) {
            mergedMsgs[name] = ''
          }
        })
        setErrors({
          msg: mergedMsgs,
          ok: !_.find(mergedMsgs, val => val !== '')
        })
      }
    }, Object.values(data))
  })

  return errors
}
