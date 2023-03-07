const { postService, categoryService } = require('../services');

const newBlogPost = async (req, res) => {
  const { categoryIds, content, title } = req.body;
  const checkCategory = await Promise
    .all(categoryIds.map((id) => categoryService.getCategoryById(id)));

  if (checkCategory.some((e) => e === null)) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }
  const result = await postService.createNewBlogPost(title, content, req.data.id, categoryIds);
  return res.status(201).json(result);
};

const listAllBlogPosts = async (req, res) => {
  const result = await postService.getAllBlogPosts();
  return res.status(200).json(result);
};

module.exports = {
  newBlogPost,
  listAllBlogPosts,
};