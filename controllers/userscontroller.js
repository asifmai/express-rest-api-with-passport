const validator = require('validator');
const User = require('../models/User');

module.exports.register_post = async (req, res) => {
  const errors = [];
  const email = req.body.email ? req.body.email.trim() : '';
  const password = req.body.password ? req.body.password.trim() : '';
  const firstName = req.body.firstName ? req.body.firstName.trim() : '';
  const lastName = req.body.lastName ? req.body.lastName.trim() : '';

  if (!validator.isEmail(email)) errors.push('Email is not valid');
  if (!validator.isByteLength(password, {min: 6})) errors.push('Password must be at least 6 characters');

  if (errors.length > 0) {
    return res.status(400).json({status: 400, data: errors});
  }

  try {
    let user = await User.findOne({email});
    if (user) {
      return res.status(400).json({status: 400, data: 'User already exists'});
    }

    user = new User({
      profile: {
        firstName,
        lastName
      },
      email,
      password
    });
    await user.save();
    
    res.status(200).json({status: 200, data: 'User registered'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}