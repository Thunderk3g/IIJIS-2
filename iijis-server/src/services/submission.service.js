const Releases = require('../models/releases.model');
const Submission = require('../models/submission.model');
const User = require('../models/user.model');

/**
 * Initialise a submission
 */
const init = async (submission) => {
  const data = await Submission.create(submission);
  return data;
};

/**
 * Check if any submissions are pending for a user
 */
const incomplete = async (id) => {
  const data = await Submission.find({ user: id, confirm: false });
  return data;
};

/**
 * Update File Info
 */
const update = async (id, file) => {
  const data = await Submission.findByIdAndUpdate(id, { file }, { new: true });
  return data;
};

/**
 * Update Profile Info
 */
const updateprofile = async (id, file) => {
  const data = User.findByIdAndUpdate(id, { file }, { new: true });
  return data;
};

/**
 * Upload Info Info
 */
const uploadimage = async (file) => {
  return file;
};

/**
 * PUT Info
 */
const put = async (submission) => {
  const data = Submission.findByIdAndUpdate(submission.id, submission, { new: true });
  return data;
};

/**
 * PUT Info
 */
const confirm = async (submission) => {
  const data = Submission.findByIdAndUpdate(submission.id, submission, { new: true });
  return data;
};

/**
 * GET ALL SUBMISSIONS
 */
const getsubmissionsbyid = async (id, offset) => {
  const user = await User.findById(id);
  let data;
  let count;
  if (user.role === 'user') {
    data = await Submission.find({ user: id }).populate('user').skip(Number(offset)).limit(10);
    count = await Submission.countDocuments({ user: id });
  } else {
    data = await Submission.find().populate('user').skip(Number(offset)).limit(10);
    count = await Submission.countDocuments();
  }
  return { data, count };
};

const getlists = async (id) => {
  const data = await Submission.find({ user: id });
  return { data };
};

/**
 * Get file by submission id
 * @param {string} id
 * @returns {Promise<User>}
 */
const file = async (id) => {
  return Submission.findById(id);
};

/**
 * Get releases
 */
const releases = async () => {
  return Releases.find().populate('submissions');
};

/**
 * Create Release
 */
// eslint-disable-next-line no-shadow
const release = async (data, file) => {
  return Releases.create({
    title: data.title,
    description: data.description,
    intervieweename: data.intervieweename,
    submissions: JSON.parse(data.submissions),
    interviewee: JSON.parse(data.interviewee),
    file,
  });
};

const current = async () => {
  return Releases.findOne().sort({createdAt: -1}).populate('submissions');
};

const image = async (id) => {
  return Releases.findById(id);
};

module.exports = {
  init,
  incomplete,
  update,
  put,
  confirm,
  getsubmissionsbyid,
  updateprofile,
  file,
  release,
  releases,
  uploadimage,
  getlists,
  current,
  image,
};
