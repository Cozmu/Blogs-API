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

const listAllBlogPosts = async (req, res) => { // alguns post vem sem categoria
  const result = await postService.getAllBlogPosts();
  return res.status(200).json(result);
};

const listBlogPostById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getBlogPostsById(id);
  if (!result) return res.status(404).json({ message: 'Post does not exist' });
  return res.status(200).json(result);
};

const updateBlogPost = async (req, res) => {
  const { id } = req.params;
  const checkBlogPostExists = await postService.getBlogPostsById(id);
  if (!checkBlogPostExists) return res.status(404).json({ message: 'Non-existent post' });
  if (checkBlogPostExists.id !== req.data.id) {
    return res.status(401).json({ message: 'Unauthorized user' }); 
  }
  const updateRequest = await postService.updateBlogPost(id, req.body);
  const result = await postService.getBlogPostsById(updateRequest);

  return res.status(200).json(result);
};

module.exports = {
  updateBlogPost,
  listBlogPostById,
  newBlogPost,
  listAllBlogPosts,
};