const Country = require('../models/countries.model');

/**
 * Get all countries list
 */
const getAllCountries = async () => {
  const countries = await Country.find();
  return countries;
};

module.exports = {
  getAllCountries,
};
