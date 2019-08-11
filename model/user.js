const jwt = require('jsonwebtoken');
const mongoose = require('../db');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    password: {
      type: String,
      minlength: [6, 'must be greater than 6 characters.'],
      maxlength: [512, 'must be less than 512 characters.'],
      required: true
    },

    avatar: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// Virtuals
userSchema.virtual('jwtToken').get(function() {
  const { name, email, avatar } = this;
  return jwt.sign(
    {
      name,
      email,
      avatar
    },
    process.env.JWT,
    { expiresIn: '3hr' }
  );
});

module.exports = mongoose.model('User', userSchema);
