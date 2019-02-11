var jwt = require('jsonwebtoken');
var uuid = require('uuid/v4')

module.exports = {
  afterLoginUrl: 'https://juwal.lo/connect',
  jwtSecret: '^45^PE@THjDf4eSt<AIZ7F|o^*HIEs',
  basePath: '/api/auth',
  paths: {
    register: '/register',
    login: '/login',
    logout: '/logout',
    verify: '/verify'
  },
  defaultGroup: 'member',

  afterConstruct: function(self) {
    self.addRoutes()
    self.apos.on('csrfExceptions', self.addCsrfExceptions)
  },

  construct: function(self, options) {
    require('./lib/routes')(self, options);

    self.addCsrfExceptions = function(exceptions) {
      exceptions.push('/api/**')
    }

    self.loginAfterLogin = function(req) {
      if (req.originalUrl.match(/^\/auth\/[^/]+\/callback/)) {
        req.redirect = options.afterLoginUrl + '?token=' + self.getToken(req.user);
      }
    };

    self.refreshSessionId = function(user) {
      user.sessionId = uuid()
    }

    self.getToken = function(user) {
      return jwt.sign({
        userId: user._id,
        sessionId: user.sessionId
      }, options.jwtSecret);
    }

    self.verifyToken = function(token) {
      return jwt.verify(token, options.jwtSecret)
    }

    self.adminReq = function() {
      return { user: { _permissions: { admin: true }}}
    }
  }
}