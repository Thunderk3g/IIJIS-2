const { any, string } = require('joi');
const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const submissionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    commentsforeditor: {
      type: String,
      required: true,
      trim: true,
    },
    agree: {
      type: Boolean,
      required: true,
      trim: true,
    },
    unique: {
      type: Boolean,
      required: true,
      trim: true,
    },
    filetype: {
      type: Boolean,
      required: true,
      trim: true,
    },
    urlprovided: {
      type: Boolean,
      required: true,
      trim: true,
    },
    formatted: {
      type: Boolean,
      required: true,
      trim: true,
    },
    followsguidelines: {
      type: Boolean,
      required: true,
      trim: true,
    },
    stage: {
      type: Number,
      required: true,
    },
    file: {
      type: Object,
      required: false,
    },
    articlecomponent: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    publisher: {
      type: String,
      required: false,
    },
    source: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: false,
    },
    contributor: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    language: {
      type: String,
      required: false,
    },
    metadata: {
      type: Object,
      required: false,
    },
    confirm: {
      type: Boolean,
      required: true,
    },
    choice: {
      type: String,
      required: false,
    },
    feedbackdescription: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
submissionSchema.plugin(toJSON);

/**
 * @typedef Submission
 */
const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;
