import express from 'express';
import { loginOrRegisterUser } from '../controllers/auth.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// The frontend will send a POST request to this endpoint
// with the Firebase token in the header.
router.post('/login', authMiddleware, loginOrRegisterUser);

export default router;