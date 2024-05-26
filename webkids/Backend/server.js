const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const app = express();
app.use(express.json());

// Das ist die MongoDB Connection
mongoose.connect('mongodb://localhost:27017/mydatabase', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

// Hier wird es weitergeleitet auf die Regestrierungs Page
app.post('/register', async (req, res) => {
try {
    const { email, firstName, lastName, birthdate, password } = req.body;

    // Hier wird Überprüft ob dieser user exestiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Hier wird ein neuer User erstellt
    const newUser = new User({
    email,
    firstName,
    lastName,
    birthdate,
    password: hashedPassword,
    });

    // Hier wird alles abgespeichert die Daten des Users
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));