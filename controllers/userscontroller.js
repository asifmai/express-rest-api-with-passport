const validator = require('validator');
const User = require('../models/User');

module.exports.register_post = async (req, res) => {
  try {
    // Fetch Data From Request
    const firstName = req.body.firstName ? req.body.firstName.trim() : '';
    const lastName = req.body.lastName ? req.body.lastName.trim() : '';
    const email = req.body.email ? req.body.email.trim() : '';
    const password = req.body.password ? req.body.password.trim() : '';

    // Validators
    const errors = [];
    if (validator.isEmpty(firstName) || validator.isEmpty(lastName) || validator.isEmpty(email) || validator.isEmpty(password)) {
      errors.push('firstName, lastName, email and password is required');
    }
    if (!validator.isEmail(email)) errors.push('Email is not valid');
    if (!validator.isByteLength(password, { min: 6 })) errors.push('Password must be at least 6 characters');

    if (errors.length) {
      return res.status(400).json({ status: 400, data: errors.join('\n') });
    }

    // Process
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ status: 400, data: 'User already exists' });
    }

    user = new User({
      firstName,
      lastName,
      email,
      password,
    });
    await user.save();

    res.status(200).json({ status: 200, data: user });
  } catch (error) {
    console.log(' error', error.stack);
    res.status(500).json({ status: 500, data: 'Server Error' });
  }
};
