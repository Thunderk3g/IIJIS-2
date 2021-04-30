const { any } = require('joi');
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const ReleasesSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    submissions: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Submission',
      },
    ],
    description: {
      type: String,
      required: false,
    },
    file: {
      type: Object,
    },
    interviewee: {
      type: Object,
    },
    intervieweename: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ReleasesSchema.plugin(toJSON);

/**
 * @typedef Submission
 */
const Releases = mongoose.model('Releases', ReleasesSchema);

module.exports = Releases;
