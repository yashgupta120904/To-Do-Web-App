import express from 'express';
import authMiddleware from '../middleware/auth.js';
import Todo from '../models/Todo.js';
import Board from '../models/Board.js';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Get all todos for a board
router.get('/boards/:boardId/todos', async (req, res) => {
    try {
        // Verify board belongs to user
        const board = await Board.findOne({ _id: req.params.boardId, userId: req.user._id });

        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }

        const todos = await Todo.find({ boardId: req.params.boardId }).sort({ createdAt: -1 });
        res.json({ todos });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new todo
router.post('/boards/:boardId/todos', async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ error: 'Todo title is required' });
        }

        // Verify board belongs to user
        const board = await Board.findOne({ _id: req.params.boardId, userId: req.user._id });

        if (!board) {
            return res.status(404).json({ error: 'Board not found' });
        }

        const todo = await Todo.create({
            title: title.trim(),
            description: description ? description.trim() : '',
            boardId: req.params.boardId,
        });

        res.status(201).json({ todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update todo
router.put('/todos/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        // Verify board belongs to user
        const board = await Board.findOne({ _id: todo.boardId, userId: req.user._id });

        if (!board) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({ error: 'Todo title cannot be empty' });
            }
            todo.title = title.trim();
        }

        if (description !== undefined) {
            todo.description = description.trim();
        }

        if (completed !== undefined) {
            todo.completed = completed;
        }

        await todo.save();

        res.json({ todo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete todo
router.delete('/todos/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        // Verify board belongs to user
        const board = await Board.findOne({ _id: todo.boardId, userId: req.user._id });

        if (!board) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        await todo.deleteOne();

        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
