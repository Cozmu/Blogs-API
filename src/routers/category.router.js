const express = require('express');
const { categoryController } = require('../controllers');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, categoryController.listAllCategories);
router.post('/', validateToken, categoryController.newCategory);

module.exports = router;