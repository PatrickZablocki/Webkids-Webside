require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const sharp = require('sharp');

const User = require('./models/user');
const Subscriber = require('./models/subscriber');
const ProfileVisit = require('./models/profileVisit');

const app = express();
app.use(express.json());
app.use(cors());

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';

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

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype.startsWith('video')) {
        cb(null, true);
    } else {
        cb(new Error('Bitte laden Sie nur Bilder oder Videos hoch'));
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/upload-file', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;

        if (req.file.mimetype.startsWith('image')) {
            await sharp(filePath)
                .resize({ width: 800, height: 600 })
                .toFile(filePath);
        }

        res.status(201).json({ message: 'Datei erfolgreich hochgeladen', path: req.file.filename });
    } catch (error) {
        console.error('Fehler beim Hochladen der Datei:', error.stack);
        res.status(500).json({ message: 'Interner Serverfehler', error: error.message });
    }
});

app.delete('/delete-file/:filename', (req, res) => {
    try {
        const { filename } = req.params;
        const filePath = path.join(__dirname, uploadDir, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: 'Datei nicht gefunden' });
        }

        fs.unlinkSync(filePath);

        res.status(200).json({ message: 'Datei erfolgreich gelöscht' });
    } catch (error) {
        console.error('Fehler beim Löschen der Datei:', error.stack);
        res.status(500).json({ message: 'Interner Serverfehler', error: error.message });
    }
});

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
        console.error('Fehler bei der Registrierung:', error.stack);
        res.status(500).json({ message: 'Interner Serverfehler', error: error.message });
    }
});

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

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

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
        console.error('Fehler beim Login:', error.stack);
        res.status(500).json({ message: 'Interner Serverfehler', error: error.message });
    }
});

app.post('/decline-newsletter', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email ist erforderlich' });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ message: 'Benutzer nicht gefunden' });
        }

        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        existingUser.newsletterDeclined = true;
        await existingUser.save();

        res.status(201).json({ message: 'Erfolgreich abonniert' });
    } catch (error) {
        console.error('Fehler beim Abonnement:', error.stack);
        res.status(500).json({ message: 'Interner Serverfehler', error: error.message });
    }
});

app.get('/user', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'Benutzer nicht gefunden' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Fehler beim Abrufen des Benutzers:', error.stack);
        res.status(500).json({ message: 'Interner Serverfehler', error: error.message });
    }
});

app.post('/profile-visit', async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'Benutzer-ID ist erforderlich' });
        }

        const newVisit = new ProfileVisit({ userId });
        await newVisit.save();

        res.status(201).json({ message: 'Profilbesuch erfolgreich hinzugefügt' });
    } catch (error) {
        console.error('Fehler beim Hinzufügen des Profilbesuchs:', error.stack);
        res.status(500).json({ message: 'Interner Serverfehler', error: error.message });
    }
});

app.get('/profile-visits/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        const visitsCount = await ProfileVisit.countDocuments({ userId });

        res.status(200).json({ visitsCount });
    } catch (error) {
        console.error('Fehler beim Abrufen der Profilbesuche:', error.stack);
        res.status(500).json({ message: 'Interner Serverfehler', error: error.message });
    }
});

const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');

app.use('/api/posts', postRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
