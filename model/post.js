const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    text: {
      type: String,
      required: true
    },

    name: {
      type: String,
      default: this.user.name
    },

    avatar: {
      type: String,
      default: this.user.avatar
    },

    likes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ],

    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        },

        text: {
          type: String,
          required: true
        },

        name: {
          type: String
        },

        avatar: {
          type: String
        },

        date: {
          type: Date,
          default: Date.now
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Post', postSchema);
