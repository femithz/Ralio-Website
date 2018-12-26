var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
var Admin=require('./models/admin')
passport.use('local', new LocalStrategy(
  function(username, password, done) {
    Admin.findOne({ username: username }, function(err, admin) {
      if (err) { return done(err); }
      if (!admin) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!admin.isValid(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, admin);
    });
  }
));

passport.serializeUser(function(admin, done) {
    done(null, admin._id);
  });
  
  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
      done(err, admin);
    });
  });