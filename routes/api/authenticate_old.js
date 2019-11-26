'use strict';

const express = require('express');
const router = express.Router();
const LoginController = require('../../routes/api/LoginController');

const { loginJWT } = LoginController();
console.log('hola')
router.get('/', loginJWT);

module.exports = router;