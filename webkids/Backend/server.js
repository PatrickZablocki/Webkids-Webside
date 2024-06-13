require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const User = require('./models/user');
const Subscriber = require('./models/subscriber');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';
mongoose.set('debug', true);  // Mongoose Debugging aktivieren
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

// Registrierung
app.post('/register', async (req, res) => {
    try {
        const { email, firstName, lastName, birthdate, password } = req.body;

        if (!email || !firstName || !lastName || !birthdate || !password) {
            return res.status(400).json({ message: 'Alle Felder sind erforderlich' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Benutzer existiert bereits' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            firstName,
            lastName,
            birthdate,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
    } catch (error) {
        console.error('Fehler bei der Registrierung:', error);
        res.status(500).json({ message: 'Interner Serverfehler', error: error.message }); 
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email und Passwort sind erforderlich' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Benutzer nicht gefunden' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Ungültiges Passwort' });
        }

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        const existingSubscriber = await Subscriber.findOne({ email });
        let showNewsletterPopup = false;
        if (!existingSubscriber) {
            showNewsletterPopup = true;
        }

        res.status(200).json({ 
            message: 'Login erfolgreich', 
            token, 
            showNewsletterPopup 
        });
    } catch (error) {
        console.error('Fehler beim Login:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// Newsletter-Abonnement
app.post('/decline-newsletter', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email ist erforderlich' });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Benutzer bereits abonniert' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        existingUser.newsletterDeclined = true;
        await existingUser.save();

        res.status(201).json({ message: 'Erfolgreich abonniert' });
    } catch (error) {
        console.error('Fehler beim Abonnement:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// Benutzerinformationen abrufen
app.get('/user', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Fehler beim Abrufen des Benutzers:', error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
});

// API-Routen für Posts, Authentifizierung und Chat
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat'); 

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));