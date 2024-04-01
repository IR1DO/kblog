const express = require('express');
const verifyToken = require('../utils/verifyUser');
const {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  getComments,
} = require('../controllers/comment.controller');

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken, editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getComments', verifyToken, getComments);

module.exports = router;
