const express = require('express');
const { postCotroller } = require('../controllers');
const validateToken = require('../middlewares/validateToken');
const validateNewBlogPost = require('../middlewares/validateNewBlogPost');

const router = express.Router();

router.get('/', validateToken, postCotroller.listAllBlogPosts);
router.post(
  '/',
  validateToken,
  validateNewBlogPost,
  postCotroller.newBlogPost,
);

module.exports = router;