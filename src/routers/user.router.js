const express = require('express');
const { userController } = require('../controllers');
const validateNewUser = require('../middlewares/validateNewUser');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/', validateToken, userController.listUsers);
router.post('/', validateNewUser, userController.newUser);

module.exports = router;