const express = require('express');
const {
  signup,
  signin,
  googleAuth,
} = require('../controllers/auth.controller');

const router = express.Router();

router.post('/sign-up', signup);
router.post('/sign-in', signin);
router.post('/google-auth', googleAuth);

module.exports = router;
