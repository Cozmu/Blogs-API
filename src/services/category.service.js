const { Category } = require('../models');

const createNewCategory = async (name) => {
  const result = await Category.create({ name });
  return result;
};

module.exports = {
  createNewCategory,
};