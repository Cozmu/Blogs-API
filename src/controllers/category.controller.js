const { categoryService } = require('../services');

const newCategory = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  const result = await categoryService.createNewCategory(name);
  return res.status(201).json(result);
};

module.exports = {
  newCategory,
};