const { categoryService } = require('../services');

const newCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const result = await categoryService.createNewCategory(name);
  return res.status(201).json(result);
};

const listAllCategories = async (req, res) => {
  const result = await categoryService.getAllCategories();
  res.status(200).json(result);
};
 
module.exports = {
  listAllCategories,
  newCategory,
};