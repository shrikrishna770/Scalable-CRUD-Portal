const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const auth = require('../middleware/auth');

// Create Note
router.post('/', auth, async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const note = new Note({ userId: req.user.id, title, content, tags });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get All Notes
router.get('/', auth, async (req, res) => {
    try {
        const { search, tag } = req.query;
        let query = { userId: req.user.id };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { content: { $regex: search, $options: 'i' } }
            ];
        }

        if (tag) {
            query.tags = tag;
        }

        const notes = await Note.find(query).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update Note
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title, content, tags },
            { new: true }
        );
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete Note
router.delete('/:id', auth, async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
