const express = require('express');
const { userController } = require('../controllers');
const validateNewUser = require('../middlewares/validateNewUser');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.get('/:id', validateToken, userController.listUserById);
router.get('/', validateToken, userController.listUsers);
router.post('/', validateNewUser, userController.newUser);
router.delete('/me', validateToken, userController.deleteUser);

module.exports = router;