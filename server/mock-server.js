const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'mock_secret_key';
const users = [];
const notes = [];

// Auth Routes
app.post('/api/auth/signup', (req, res) => {
    const { name, email, password } = req.body;
    console.log(`[Signup Attempt] name: ${name}, email: ${email}`);

    if (!name || !email || !password) {
        console.error('[Signup Failed] Missing fields');
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (users.find(u => u.email === email)) {
        console.warn(`[Signup Failed] User already exists: ${email}`);
        return res.status(400).json({ message: 'User already exists. Please login instead.' });
    }

    const user = { id: Math.random().toString(36).substr(2, 9), name, email };
    users.push({ ...user, password });
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    console.log(`[Signup Success] Created user: ${email}`);
    res.status(201).json({ token, user });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
});

app.get('/api/auth/profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.id === decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.put('/api/auth/profile', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = users.find(u => u.id === decoded.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const { name } = req.body;
        if (name) user.name = name;

        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

// Notes Routes
app.get('/api/notes', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { search, tag } = req.query;
        let filtered = notes.filter(n => n.userId === decoded.id);
        if (search) {
            filtered = filtered.filter(n =>
                n.title.toLowerCase().includes(search.toLowerCase()) ||
                n.content.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (tag) {
            filtered = filtered.filter(n => n.tags.includes(tag));
        }
        res.json(filtered);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.post('/api/notes', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const note = {
            _id: Math.random().toString(36).substr(2, 9),
            ...req.body,
            userId: decoded.id,
            createdAt: new Date().toISOString()
        };
        notes.push(note);
        res.status(201).json(note);
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
});

app.delete('/api/notes/:id', (req, res) => {
    const index = notes.findIndex(n => n._id === req.params.id);
    if (index !== -1) notes.splice(index, 1);
    res.json({ message: 'Note deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Mock server running on port ${PORT}`));
