const generateToken = require('../helpers/generatetoken');
const passport = require('passport');

module.exports.login_post = async function (req, res, next) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ status: 400, data: 'Unauthorized' });
    }
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ status: 400, data: 'Unauthorized' });
    }
    return res.status(200).json({ status: 200, data: generateToken(user) });
  })(req, res, next);
};

module.exports.me_get = (req, res, next) => {
  return res.status(200).json({ status: 200, data: req.user });
};
