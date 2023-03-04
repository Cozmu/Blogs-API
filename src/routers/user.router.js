const express = require('express');
const { userController } = require('../controllers');
const validateNewUser = require('../middlewares/validateNewUser');

const router = express.Router();

router.post('/', validateNewUser, userController.newUser);

module.exports = router;