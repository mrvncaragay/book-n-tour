const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    handle: {
      type: String,
      required: true,
      maxLength: 40
    },

    company: {
      type: String
    },

    website: {
      type: String
    },

    locaton: {
      type: String
    },

    status: {
      type: String,
      enum: [
        'Software Developer',
        'Backend Developer',
        'Frontend Developer',
        'Student',
        'Instructor'
      ],
      required: true
    },

    skills: {
      type: [String],
      required: true
    },

    bio: {
      type: String
    },

    githubusername: {
      type: String
    },

    experience: [
      {
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String },
        from: { type: Date, required: true },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String }
      }
    ],

    education: [
      {
        school: { type: String, required: true },
        degree: { type: String, required: true },
        filedOfStudy: { type: String, required: true },
        from: { type: Date, required: true },
        to: { type: Date },
        current: { type: Boolean, default: false },
        description: { type: String }
      }
    ],

    social: {
      youtube: { type: String },
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      instagram: { type: String }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Profile', profileSchema);
