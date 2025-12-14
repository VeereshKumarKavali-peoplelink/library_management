const express = require('express');
const { signUpAPI, loginAPI } = require('../controllers/userController');
const {validateUser} = require('../middleware/validations');
const router = express.Router();

router.post('/register', validateUser, signUpAPI);
router.post('/login',  validateUser, loginAPI);

module.exports = router;