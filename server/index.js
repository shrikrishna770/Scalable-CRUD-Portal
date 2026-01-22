const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

// Database Connection
const connectDB = async () => {
    try {
        let uri = process.env.MONGODB_URI;

        if (!uri || uri.includes('localhost')) {
            try {
                // Attempt to check if local MongoDB is up, if not, use memory server
                await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
                console.log('Connected to local MongoDB');
            } catch (err) {
                console.log('Local MongoDB not found, starting In-Memory MongoDB...');
                const { MongoMemoryServer } = require('mongodb-memory-server');
                const mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                await mongoose.connect(uri);
                console.log('Connected to In-Memory MongoDB');
            }
        } else {
            await mongoose.connect(uri);
            console.log('Connected to MongoDB Atlas');
        }
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
