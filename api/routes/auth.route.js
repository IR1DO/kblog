const express = require('express');
const { signup, signin } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);

module.exports = router;
