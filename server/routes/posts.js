import express from 'express';
import { getPosts, getPost, createPost, updatePost, likePost, deletePost, commentPost, deleteComment } from '../controllers/posts.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// This route remains public - anyone can see the posts
router.get('/', getPosts);
router.get('/:id', getPost);

// These routes are now protected. Only logged-in users can perform these actions.
router.post('/', authMiddleware, createPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.patch('/:id/likePost', likePost);
router.post('/:id/commentPost', authMiddleware, commentPost);
router.delete('/:id/deleteComment/:commentId', authMiddleware, deleteComment);

export default router;