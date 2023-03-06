const { Category } = require('../models');

const createNewCategory = async (name) => {
  const result = await Category.create({ name });
  return result;
};

const getAllCategories = async () => {
  const result = await Category.findAll();
  return result;
};

module.exports = {
  getAllCategories,
  createNewCategory,
};