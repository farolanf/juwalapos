/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const wrapWithProvider = require('./wrap-with-provider')

module.exports = {
  wrapRootElement: wrapWithProvider
}