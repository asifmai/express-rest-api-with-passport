const passport = require('passport');

module.exports.ensureAuthenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    console.log(user);
    if (err) {
      console.log(err);
      return res.status(400).json({ status: 400, data: 'Unauthorized' });
    }
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ status: 400, data: 'Unauthorized' });
    }
    req.user = user;
    return next();
  })(req, res, next);
};
