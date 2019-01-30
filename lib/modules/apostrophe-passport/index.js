var async = require('async');

module.exports = {
  strategies: [
    {
      module: 'passport-google-oauth20',
      match: 'email',
      options: {
        clientID: '747816559460-mn2ltem8aaufftoou3p87ti0imcale8j.apps.googleusercontent.com',
        clientSecret: 'EbYsDFgjyInapmGpVRlJ2Sxa'
      },
      authenticate: {
        scope: ['profile', 'email']
      }
    },
    {
      module: 'passport-facebook',
      match: 'email',
      options: {
        clientID: '257680121518280',
        clientSecret: '40ce5be251278c54201068b7490e4581',
        profileFields: ['id', 'displayName', 'first_name', 'last_name', 'email']
      }
    }
  ],
  create: {
    group: {
      title: 'member',
      permissions: []
    }
  },

  construct: function(self, options) {

    self.createUser = function(spec, profile, callback) {
      var user = self.apos.users.newInstance();
      user.username = profile.username;
      user.title = profile.displayName || profile.username || '';
      user[spec.name + 'Id'] = profile.id;
      if (!user.username) {
        user.username = self.apos.utils.slugify(user.title);
      }

      async.waterfall([ensureUniqueUsername, body], callback);

      function ensureUniqueUsername(callback) {
        var req = self.apos.tasks.getReq();
        self.apos.users.find(req, {
          username: { $regex: '^' + user.username }
        }).toArray(function(err, users) {
          if (err) return callback(err);
          if (users.length) {
            user.username += users.length + 1;
          }
          callback();
        });
      }

      function body(callback) {
        var emails = self.getRelevantEmailsFromProfile(spec, profile);
        if (emails.length) {
          user.email = emails[0];
        }
        if (profile.name) {
          user.firstName = profile.name.givenName;
          if (profile.name.middleName) {
            user.firstName += ' ' + profile.name.middleName;
          }
          user.lastName = profile.name.familyName;
        } else {
          parsedName = humanname.parse(profile.displayName);
          user.firstName = parsedName.firstName;
          user.lastName = parsedName.lastName;
        }
        var req = self.apos.tasks.getReq();
        if (self.createGroup) {
          user.groupIds = [ self.createGroup._id ];
        }
        if (spec.import) {
          // Allow for specialized import of more fields
          spec.import(profile, user);
        }
        return self.apos.users.insert(req, user, function(err) {
          return callback(err, user);
        });
      }
    };
  }
}