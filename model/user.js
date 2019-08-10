const mongoose = require('../db');

const User = mongoose.model(
  'User',
  new mongoose.Schema({
    name: {
      type: String
    }
  })
);

module.exports = User;
