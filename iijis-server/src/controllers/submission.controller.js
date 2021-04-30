const httpStatus = require('http-status');
const path = require('path');
const catchAsync = require('../utils/catchAsync');
const submissionService = require('../services/submission.service');

const appDir = path.dirname(require.main.filename);

const init = catchAsync(async (req, res) => {
  const data = await submissionService.init(req.body);
  res.status(httpStatus.CREATED).send({ data });
});

const incomplete = catchAsync(async (req, res) => {
  const data = await submissionService.incomplete(req.params.id);
  res.status(httpStatus.OK).send(data);
});

const document = catchAsync(async (req, res) => {
  const data = await submissionService.update(req.body.user, req.file);
  res.status(httpStatus.OK).send({ data });
});

const profile = catchAsync(async (req, res) => {
  const data = await submissionService.updateprofile(req.body.user, req.file);
  res.status(httpStatus.OK).send({ data });
});

const uploadimage = catchAsync(async (req, res) => {
  const data = await submissionService.uploadimage(req.file);
  res.status(httpStatus.OK).send({ data });
});

const update = catchAsync(async (req, res) => {
  const data = await submissionService.put(req.body);
  res.status(httpStatus.OK).send({ data });
});

const confirm = catchAsync(async (req, res) => {
  const data = await submissionService.confirm(req.body);
  res.status(httpStatus.OK).send({ data });
});

const getsubmissionsbyid = catchAsync(async (req, res) => {
  const data = await submissionService.getsubmissionsbyid(req.params.id, req.params.offset);
  res.status(httpStatus.OK).send({ data });
});

const getlist = catchAsync(async (req, res) => {
  const data = await submissionService.getlists(req.params.id);
  res.status(httpStatus.OK).send({ data });
});

const file = catchAsync(async (req, res) => {
  const result = await submissionService.file(req.params.id);
  res.setHeader('Content-Disposition', 'attachment; filename=' + result.file.originalname);
  res.download(path.join(appDir, '../') + result.file.path, result.file.originalname);
});

const releases = catchAsync(async (req, res) => {
  const data = await submissionService.releases();
  res.status(httpStatus.OK).send({ data });
});

const release = catchAsync(async (req, res) => {
  const data = await submissionService.release(req.body, req.file);
  res.status(httpStatus.OK).send({ data });
});

const current = catchAsync(async (req, res) => {
  const data = await submissionService.current();
  res.status(httpStatus.OK).send({ data });
});

const getImage = catchAsync(async (req, res) => {
  const result = await submissionService.image(req.params.id);
  res.setHeader('Content-Disposition', 'attachment; filename=' + result.file.originalname);
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Content-Type', 'application/octet-stream');
  res.sendFile(result.file.path, { root: path.join(appDir, '../') });
});

const getIntervieweeImage = catchAsync(async (req, res) => {
  const result = await submissionService.image(req.params.id);
  res.setHeader('Content-Disposition', 'attachment; filename=' + result.interviewee.originalname);
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Content-Type', 'application/octet-stream');
  res.sendFile(result.interviewee.path, { root: path.join(appDir, '../') });
});

module.exports = {
  init,
  incomplete,
  document,
  update,
  confirm,
  getsubmissionsbyid,
  profile,
  file,
  release,
  releases,
  uploadimage,
  getlist,
  getImage,
  current,
  getIntervieweeImage,
};
