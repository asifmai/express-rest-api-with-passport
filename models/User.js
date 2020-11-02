const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Create User Schema
const UserSchema = new mongoose.Schema({
  profile: {
    firstName: String,
    lastName: String,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt the Password before Saving to DB
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const hash = await bcrypt.hash(user.password, 10);
  this.password = hash;
  next();
});

// Check if the password is correct
UserSchema.methods.isValidPassword = async function(password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
}

UserSchema.virtual('fullName').get(function() {
  return this.profile.firstName + ' ' + this.profile.lastName
})

UserSchema.set('toObject', {virtuals: true});
UserSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('user', UserSchema);
