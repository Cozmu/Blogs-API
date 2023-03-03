const express = require('express');
const { loginCotroller } = require('../controllers');

const router = express.Router();

router.post('/', loginCotroller.login);

module.exports = router;