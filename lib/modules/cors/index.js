module.exports = {
  hosts: [
    'https://juwal.lo'
  ],
  headers: [
    'Authorization',
    'Content-Type',
    'X-XSRF-TOKEN',
  ],

  construct: function(self, options) {
    self.expressMiddleware = {
      middleware: function(req, res, next) {
        res.set('Access-Control-Allow-Origin', options.hosts.join(','))
        res.set('Access-Control-Allow-Headers', options.headers.join(','))
        next()
      },
      when: 'beforeRequired',
      before: 'apostrophe-assets'
    }
  }
}