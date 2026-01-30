import express from 'express';
import authMiddleware from '../middleware/auth.js';
import Board from '../models/Board.js';
import Todo from '../models/Todo.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all boards for current user
router.get('/', async (req, res) => {
    try {
        const boards = await Board.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json({ boards });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new board
router.post('/', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Board name is required' });
        }

        const board = await Board.create({
            name: name.trim(),
            userId: req.user._id,
        });

        res.status(201).json({ board });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update board name
router.put('/:id', async (req, res) => {
    try {
        const { name } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({ error: 'Board name is required' });
        }

        const board = await Board.findOne({ _id: req.params.id, userId: req.user._id });

        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }

        board.name = name.trim();
        await board.save();

        res.json({ board });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete board
router.delete('/:id', async (req, res) => {
    try {
        const board = await Board.findOne({ _id: req.params.id, userId: req.user._id });

        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }

        // Delete all todos in this board
        await Todo.deleteMany({ boardId: board._id });

        // Delete the board
        await board.deleteOne();

        res.json({ message: 'Board deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
