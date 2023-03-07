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
  if (!checkBlogPostExists) return res.status(404).json({ message: 'Post does not exist' });
  if (checkBlogPostExists.id !== req.data.id) {
    return res.status(401).json({ message: 'Unauthorized user' }); 
  }
  const updateRequest = await postService.updateBlogPost(id, req.body);
  const result = await postService.getBlogPostsById(updateRequest);

  return res.status(200).json(result);
};

const deleteBlogPost = async (req, res) => {
  const { id } = req.params;
  const checkBlogPostExists = await postService.getBlogPostsById(id);
  if (!checkBlogPostExists) return res.status(404).json({ message: 'Post does not exist' });
  if (checkBlogPostExists.userId !== req.data.id) {
    return res.status(401).json({ message: 'Unauthorized user' }); 
  }
  await postService.destroy(id);
  return res.status(204).end();
};

const listBlogPostBySearch = async (req, res) => {
  const { q } = req.query;
  const allBlogPosts = await postService.getAllBlogPosts();
  if (!q) return res.status(200).json(allBlogPosts);  
  const searchByTitle = await postService.getBlogPostBySearch(q);
  return res.status(200).json(searchByTitle);
};

module.exports = {
  listBlogPostBySearch,
  updateBlogPost,
  listBlogPostById,
  deleteBlogPost,
  newBlogPost,
  listAllBlogPosts,
};