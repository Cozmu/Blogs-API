const express = require('express');
const { postCotroller } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const validateNewBlogPost = require('../middlewares/validateNewBlogPost');
const validateUpdateBlogPost = require('../middlewares/validateUpdateBlogPost');

const router = express.Router();

router.get('/:id', validateToken, postCotroller.listBlogPostById);
router.get('/', validateToken, postCotroller.listAllBlogPosts);
router.post(
  '/',
  validateToken,
  validateNewBlogPost,
  postCotroller.newBlogPost,
);
router.put(
  '/:id', 
  validateToken,
  validateUpdateBlogPost,
  postCotroller.updateBlogPost,
);

router.delete('/:id', validateToken, postCotroller.deleteBlogPost);

module.exports = router;