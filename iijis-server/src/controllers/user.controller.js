const httpStatus = require('http-status');
const path = require('path');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');

const appDir = path.dirname(require.main.filename);

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getImage = catchAsync(async (req, res) => {
  const result = await userService.image(req.params.id);
  res.setHeader('Content-Disposition', 'attachment; filename=' + result.file.originalname);
  res.setHeader('Content-Transfer-Encoding', 'binary');
  res.setHeader('Content-Type', 'application/octet-stream');
  res.sendFile(result.file.path, { root: path.join(appDir, '../') });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

const changePassword = catchAsync(async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    res.status(httpStatus.CONFLICT).send('Passwords do not match!');
  } else {
    const data = await userService.updatePassword(req.body);
    if (!data) {
      res.status(httpStatus.BAD_REQUEST).send('Incorrect password!');
    } else {
      res.status(httpStatus.OK).send({ data });
    }
  }
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getImage,
  changePassword,
};
