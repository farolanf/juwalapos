const { compose } = require('lodash/fp')

const redux = require('./redux')
const intl = require('./intl')
const mui = require('./mui')

const wrapWithProvider = ({ element }) => compose(
  redux,
  intl,
  mui
)(element)

module.exports = wrapWithProvider