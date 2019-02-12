const async = require('async')
const Promise = require('bluebird')
const _ = require('lodash')

const validate = require('juwal-validation')
const registerSchema = require('juwal-validation/server/register')

delete registerSchema.passwordConfirm

module.exports = function(self, options) {

  self.addRoutes = function() {
    self.addRegisterRoute()
    self.addLoginRoute()
    self.addLogoutRoute()
    self.addVerifyRoute()
    self.addUniqueEmailRoute()
  }

  self.addRegisterRoute = function() {
    self.apos.app.post(options.basePath + options.paths.register, function(req, res) {
      const email = self.apos.launder.string(req.body.email)
      const password = self.apos.launder.string(req.body.password)

      if (validate({ email, password }, registerSchema)) {
        return res.sendStatus(400)
      }

      async.waterfall([
        self.apos.groups.find(self.adminReq(), { title: options.defaultGroup }).toObject,
        insertUser
      ], function(err, user) {
        if (err || !user) {
          return res.sendStatus(500)
        }
        res.send(user)
      })

      function insertUser(group, callback) {
        if (!group) {
          console.log('Invalid default group:', options.defaultGroup)
          return callback(500)
        }
        self.apos.users.insert(self.adminReq(), {
          email,
          password,
          username: email,
          title: email,
          firstName: email,
          groupIds: [group._id]
        }, callback)
      }
    })
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
      const token = self.apos.launder.string(req.body.token)
      Promise.try(function() {
        const payload = self.verifyToken(token)
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
      const token = self.apos.launder.string(req.body.token)
      Promise.try(function() {
        const payload = self.verifyToken(token)
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

  self.addUniqueEmailRoute = function() {
    self.apos.app.post(options.basePath + options.paths.uniqueEmail, function(req, res) {
      const email = self.apos.launder.string(req.body.email)
      self.apos.users.find(self.adminReq(), { email }).toObject(function(err, user) {
        if (err) {
          return res.sendStatus(500)
        }
        if (user) {
          return res.send({ ok: false })
        }
        return res.send({ ok: true })
      })
    })
  }
}