const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create a new todo
router.post('/', async (req, res) => {
    try {
        const todo = await Todo.create({ title: req.body.title });
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Read all todos
router.get('/', async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: 1 });
    res.json(todos);
});

// Update a todo
router.put('/:id', async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        {$set: req.body},
        {new: true}
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
});

// Delete a todo
router.delete('/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
});

module.exports = router;