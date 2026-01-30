import express from 'express';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Verify token and get/create user
router.post('/verify', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

// Get current user
router.get('/me', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

export default router;
