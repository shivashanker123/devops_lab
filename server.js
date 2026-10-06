const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Allows us to read JSON data from the frontend

// Connect to MongoDB (Replace with your MongoDB Atlas string if you have one, or use local)
mongoose.connect('mongodb+srv://psshanker381:Shiva2025mongodb@cluster0.8sjs72x.mongodb.net/?appName=Cluster0')


  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Create a Database Schema for the User
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true } 
    // Note: In a real app, ALWAYS hash passwords using bcrypt before saving!
});

const User = mongoose.model('User', UserSchema);

// The Route to handle login/saving data
app.post('/api/save-credentials', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Create a new user in the database
        const newUser = new User({ username, password });
        await newUser.save();
        
        res.status(201).json({ message: 'Credentials successfully stored in the database!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving to database', error });
    }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});