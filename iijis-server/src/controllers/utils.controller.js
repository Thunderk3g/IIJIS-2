const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const utilsService = require('../services/utils.service');

const getAllCountries = catchAsync(async (req, res) => {
  const countries = await utilsService.getAllCountries();
  res.status(httpStatus.CREATED).send({ countries });
});

module.exports = {
  getAllCountries,
};
