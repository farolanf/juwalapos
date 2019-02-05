module.exports = function(self, options) {

  self.addRoutes = function() {
    self.addLoginRoute()
    self.addLogoutRoute()
    self.addVerifyRoute()
  }

  self.addLoginRoute = function() {
    self.apos.app.post(options.basePath + options.paths.login, function(req, res) {
      console.log('auth/login')
      res.send('hello')
    })
  }

  self.addLogoutRoute = function() {

  }

  self.addVerifyRoute = function() {
    self.apos.app.post(options.basePath + options.paths.verify, function(req, res) {
      console.log(req.body)
    })
  }
}