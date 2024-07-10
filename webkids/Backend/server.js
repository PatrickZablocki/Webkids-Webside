const multer = require("multer");
const sharp = require("sharp");
const ProfileVisit = require("./models/profileVisit");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const bcrypt = require("bcrypt");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const socketIo = require("socket.io");
const fs = require("fs");
const User = require("./models/user");
const Message = require("./models/Message");
const Subscriber = require("./models/subscriber");
const postRoutes = require("./routes/post");
const messageRoutes = require("./routes/message");
const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

const mongoURL =
  process.env.MONGO_URL || "mongodb://localhost:27017/mydatabase";

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
const jwtSecret = process.env.JWT_SECRET;
const bcryptSalt = bcrypt.genSaltSync(10);

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use("/uploads", express.static(path.join(__dirname, uploadDir)));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image") || file.mimetype.startsWith("video")) {
    cb(null, true);
  } else {
    cb(new Error("Bitte laden Sie nur Bilder oder Videos hoch"));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Das hochladen einer Datei
app.post("/upload-file", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;

    if (req.file.mimetype.startsWith("image")) {
      await sharp(filePath)
        .resize({ width: 150, height: 150 })
        .toFile(filePath);

      fs.unlinkSync(filePath);
      res.status(201).json({
        message: "Datei erfolgreich hochgeladen",
        path: req.file.filename,
      });
    } else {
      res.status(400).json({ message: "Ungeltiges Dateiformat" });
    }
  } catch (error) {
    console.error("Fehler beim Hochladen der Datei:", error.stack);
    res
      .status(500)
      .json({ message: "Interner Serverfehler", error: error.message });
  }
});
// Zum Löschen der Daten die man hochlädt
app.delete("/delete-file/:filename", (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, uploadDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Datei nicht gefunden" });
    }

    fs.unlinkSync(filePath);

    res.status(200).json({ message: "Datei erfolgreich gelöscht" });
  } catch (error) {
    console.error("Fehler beim Löschen der Datei:", error.stack);
    res
      .status(500)
      .json({ message: "Interner Serverfehler", error: error.message });
  }
});
//  Die Register Route
app.post("/register", async (req, res) => {
  try {
    const { email, firstName, lastName, birthdate, password } = req.body;

    if (!email || !firstName || !lastName || !birthdate || !password) {
      return res.status(400).json({ message: "Alle Felder sind erforderlich" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Benutzer existiert bereits" });
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

    res.status(201).json({ message: "Benutzer erfolgreich registriert" });
  } catch (error) {
    console.error("Fehler bei der Registrierung:", error.stack);
    res
      .status(500)
      .json({ message: "Interner Serverfehler", error: error.message });
  }
});
// Die Login Route
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email und Passwort sind erforderlich" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Benutzer nicht gefunden" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Ungültiges Passwort" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "1h" }
    );

    const existingSubscriber = await Subscriber.findOne({ email });
    let showNewsletterPopup = false;
    if (!existingSubscriber) {
      showNewsletterPopup = true;
    }

    res.status(200).json({
      message: "Login erfolgreich",
      token,
      showNewsletterPopup,
    });
  } catch (error) {
    console.error("Fehler beim Login:", error.stack);
    res
      .status(500)
      .json({ message: "Interner Serverfehler", error: error.message });
  }
});
// Route für den Newsletter
app.post("/decline-newsletter", async (req, res) => {
  try {
    // Hier keine E-Mail-Validierung mehr durchführen
    // Stattdessen den Status einfach als abgelehnt setzen

    res.status(200).json({ message: "Newsletter erfolgreich abgelehnt" });
  } catch (error) {
    console.error("Fehler beim Ablehnen des Newsletters:", error);
    res
      .status(500)
      .json({ message: "Interner Serverfehler", error: error.message });
  }
});
// Abrufen der user daten
app.get("/user", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Fehler beim Abrufen des Benutzers:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

app.put("/user", async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret"
    );
    const { firstName, lastName, email, birthdate, profilePicture } = req.body;

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    // Aktualisieren der Benutzerdaten
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.birthdate = birthdate;
    user.profilePicture = profilePicture;

    await user.save();

    res.status(200).json({ message: "Benutzerdaten erfolgreich aktualisiert" });
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Benutzerdaten:", error.stack);
    res
      .status(500)
      .json({ message: "Interner Serverfehler", error: error.message });
  }
});
// Wieviele Besucher auf deinem Profil waren
app.post("/profile-visit", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "Benutzer-ID ist erforderlich" });
    }

    const newVisit = new ProfileVisit({ userId });
    await newVisit.save();

    res.status(201).json({ message: "Profilbesuch erfolgreich hinzugefügt" });
  } catch (error) {
    console.error("Fehler beim Hinzufügen des Profilbesuchs:", error.stack);
    res
      .status(500)
      .json({ message: "Interner Serverfehler", error: error.message });
  }
});
// Un der Zähler
app.get("/profile-visits/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const visitsCount = await ProfileVisit.countDocuments({ userId });

    res.status(200).json({ visitsCount });
  } catch (error) {
    console.error("Fehler beim Abrufen der Profilbesuche:", error.stack);
    res
      .status(500)
      .json({ message: "Interner Serverfehler", error: error.message });
  }
});

// All users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("firstName lastName");
    res.status(200).json(users);
  } catch (error) {
    console.error("Fehler beim Abrufen der Benutzer:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

// Add block socket
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", async (data) => {
    try {
      const { token, content, receiver } = data;
      const decoded = jwt.verify(token, process.env.JWT_SECRET || jwtSecret);
      const user = await User.findById(decoded.userId);
      if (!user) {
        return socket.emit("error", { message: "Invalid token" });
      }
      const message = new Message({
        sender: user._id,
        receiver,
        content,
      });
      await message.save();
      console.log("Message saved:", message);
      io.emit("newMessage", {
        sender: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
        },
        receiver,
        content,
        timestamp: message.timestamp,
      });
    } catch (error) {
      console.error("Error sending message:", error.stack);
      socket.emit("error", {
        message: "Internal server error",
        error: error.message,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use("/api/posts", postRoutes);
app.use("/messages", messageRoutes);

// const authRoutes = require("./routes/auth");
// const chatRoutes = require("./routes/chat");

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
