/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
require('dotenv').config({
  path: '.env'
})

const path = require('path')

module.exports = {
  createPages: ({ actions }) => {
    const { createPage } = actions
    createPage({
      path: '/connect',
      component: path.resolve('./src/containers/pages/connect.js')
    })
  },
  onCreateWebpackConfig: ({ actions }) => {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          '$prj': path.resolve(__dirname),
          '$src': path.resolve(__dirname, 'src'),
          '$comp': path.resolve(__dirname, 'src/components'),
          '$con': path.resolve(__dirname, 'src/containers'),
          '$act': path.resolve(__dirname, 'src/actions'),
          '$styles': path.resolve(__dirname, 'src/styles'),
        }
      }
    })
  }
}