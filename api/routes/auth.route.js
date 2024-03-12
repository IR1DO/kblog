const express = require('express');
const { signup } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/sign-up', signup);

module.exports = router;
