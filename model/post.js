const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    title: {
      type: String,
      required: true
    },

    subtitle: {
      type: String,
      required: true
    },

    text: {
      type: String,
      required: true
    },

    posturl: {
      type: String
    },

    name: {
      type: String,
      default: function() {
        return this.user.name;
      }
    },

    avatar: {
      type: String,
      default: function() {
        return this.user.avatar;
      }
    },

    likes: [mongoose.Schema.Types.ObjectId],
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
