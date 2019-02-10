const async = require('async')
const Promise = require('bluebird')
const _ = require('lodash')

module.exports = function(self, options) {

  self.addRoutes = function() {
    self.addLoginRoute()
    self.addLogoutRoute()
    self.addVerifyRoute()
  }

  self.addLoginRoute = function() {
    self.apos.app.post(options.basePath + options.paths.login, function(req, res) {
      const username = self.apos.launder.string(req.body.username)
      const password = self.apos.launder.string(req.body.password)
      if (!username || !password) {
        return res.sendStatus(400)
      }
      self.apos.login.verifyLogin(username, password, function(err, user) {
        if (err) {
          return res.sendStatus(500)
        }
        if (!user) {
          return res.sendStatus(401)
        }

        if (!user.sessionId) {
          self.refreshSessionId(user)
          self.apos.users.update(self.adminReq(), user, function(err) {
            if (err) {
              return res.sendStatus(500)
            }
            return res.send({ token: self.getToken(user), user })
          })
        } else {
          return res.send({ token: self.getToken(user), user })
        }
      })
    })
  }

  // Invalidate token
  self.addLogoutRoute = function() {
    self.apos.app.post(options.basePath + options.paths.logout, function(req, res) {
      Promise.try(function() {
        const payload = self.verifyToken(req.body.token)
        logout(payload)
      }).catch(function() {
        res.sendStatus(400)
      })

      function logout(payload) {
        self.apos.users.find(req, {
          _id: payload.userId,
          sessionId: payload.sessionId
        }).toObject(function(err, user) {
          if (err) {
            return res.sendStatus(500)
          }
          if (!user) {
            return res.sendStatus(401)
          }
          self.refreshSessionId(user)
          self.apos.users.update(self.adminReq(), user, function(err) {
            if (err) {
              return res.sendStatus(500)
            }
            res.sendStatus(200)
          })
        })
      }
    })
  }

  self.addVerifyRoute = function() {
    self.apos.app.post(options.basePath + options.paths.verify, function(req, res) {
      Promise.try(function() {
        const payload = self.verifyToken(req.body.token)
        verify(payload)
      }).catch(function() {
        res.sendStatus(400)
      })

      function verify(payload) {
        self.apos.users.find(req, {
          _id: payload.userId,
          sessionId: payload.sessionId
        }).toObject(function(err, user) {
          if (err) {
            return res.sendStatus(500)
          }
          if (!user) {
            return res.sendStatus(401)
          }
          return res.send(user)
        })
      }
    })
  }
}