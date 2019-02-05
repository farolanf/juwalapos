var jwt = require('jsonwebtoken');

module.exports = {
  afterLoginUrl: 'https://juwal.lo/connect',
  jwtSecret: '586f7007-5f49-4485-afbf-eee58e6989fa',
  basePath: '/auth',
  paths: {
    login: '/login',
    logout: '/logout',
    verify: '/verify'
  },

  afterConstruct: function(self) {
    self.addRoutes();
  },

  construct: function(self, options) {
    require('./lib/routes')(self, options);

    self.loginAfterLogin = function(req) {
      if (req.originalUrl.match(/^\/auth\/[^/]+\/callback/)) {
        req.redirect = options.afterLoginUrl + '?token=' + self.getToken(req.user);
      }
    };

    self.getToken = function(user) {
      return jwt.sign({ userId: user._id }, options.jwtSecret);
    }
  }
}