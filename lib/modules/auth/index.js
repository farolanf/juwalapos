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
    verify: '/verify',
    uniqueEmail: '/unique-email'
  },
  defaultGroup: 'member',
  secure: {
    exceptions: [
      '/api/auth/register',
      '/api/auth/login',
      '/api/auth/logout',
      '/api/auth/verify',
      '/api/auth/unique-email'
    ]
  },

  afterConstruct: function(self) {
    self.useMiddleware()
    self.addRoutes()
    self.apos.on('csrfExceptions', self.addCsrfExceptions)
  },

  construct: function(self, options) {
    require('./lib/routes')(self, options);

    self.useMiddleware = function() {
      self.apos.app.use('/api', function(req, res, next) {
        const token = (req.get('Authorization') || '').replace(/^Bearer /, '')
        if (token) {
          try {
            const payload = self.verifyToken(token, options.jwtSecret)
            self.apos.users.find(self.adminReq(), {
              _id: payload.userId,
              sessionId: payload.sessionId
            }).toObject(function(err, user) {
              req.user = user
              next()
            })
          } catch (err) {
            return res.sendStatus(400)
          }
        } else {
          next()
        }
      })
    }

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