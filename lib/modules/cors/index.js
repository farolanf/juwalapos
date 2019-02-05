module.exports = {
  hosts: [
    'https://juwal.lo'
  ],
  headers: [
    'Authorization',
    'X-XSRF-TOKEN'
  ],

  construct: function(self, options) {
    self.expressMiddleware = function(req, res, next) {
      res.set('Access-Control-Allow-Origin', options.hosts.join(','))
      res.set('Access-Control-Allow-Headers', options.headers.join(','))
      next()
    }
  }
}