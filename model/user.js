const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const mongoose = require('../db');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [3, 'must be greater than 3 characters.'],
      maxlength: [100, 'must be less than 100 characters.'],
      required: true
    },

    email: {
      type: String,
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
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
      default: function() {
        return gravatar.url(this.email, { s: '200', r: 'pg', d: 'mp' });
      }
    }
  },
  {
    timestamps: true
  }
);

//userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

// Virtuals
userSchema.virtual('jwtToken').get(function() {
  const { _id: id, name, email, avatar } = this;
  return jwt.sign(
    {
      id,
      name,
      email,
      avatar
    },
    process.env.JWT,
    { expiresIn: '3hr' }
  );
});

module.exports = mongoose.model('User', userSchema);
