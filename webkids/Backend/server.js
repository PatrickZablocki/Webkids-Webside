// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http");
// const bcrypt = require("bcrypt");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const path = require("path");
// const socketIo = require("socket.io");
// const User = require("./models/user");
// const Message = require("./routes/message");
// const fs = require("fs");
// const Subscriber = require("./models/subscriber");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.json());
// app.use(cors());

// const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/chat";
// mongoose.set("debug", true);
// mongoose
//   .connect(mongoURL)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// const jwtSecret = process.env.JWT_SECRET;
// const bcryptSalt = bcrypt.genSaltSync(10);

// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// app.use("/uploads", express.static(path.join(__dirname, uploadDir)));

// // Registrierung
// app.post("/register", async (req, res) => {
//   try {
//     const { email, firstName, lastName, birthdate, password } = req.body;

//     if (!email || !firstName || !lastName || !birthdate || !password) {
//       return res.status(400).json({ message: "Alle Felder sind erforderlich" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Benutzer existiert bereits" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       email,
//       firstName,
//       lastName,
//       birthdate,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({ message: "Benutzer erfolgreich registriert" });
//   } catch (error) {
//     console.error("Fehler bei der Registrierung:", error);
//     res
//       .status(500)
//       .json({ message: "Interner Serverfehler", error: error.message });
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email und Passwort sind erforderlich" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Benutzer nicht gefunden" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Ungültiges Passwort" });
//     }

//     const token = jwt.sign(
//       { userId: user._id },
//       "my_super_secret_key_1234567890",
//       { expiresIn: "1h" }
//     );

//     const existingSubscriber = await Subscriber.findOne({ email });
//     let showNewsletterPopup = false;
//     if (!existingSubscriber) {
//       showNewsletterPopup = true;
//     }

//     res.status(200).json({
//       message: "Login erfolgreich",
//       token,
//       showNewsletterPopup,
//     });
//   } catch (error) {
//     console.error("Fehler beim Login:", error);
//     res.status(500).json({ message: "Interner Serverfehler" });
//   }
// });

// // Newsletter-Abonnement
// app.post("/decline-newsletter", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email ist erforderlich" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       return res.status(400).json({ message: "Benutzer bereits abonniert" });
//     }

//     const newSubscriber = new Subscriber({ email });
//     await newSubscriber.save();
//     existingUser.newsletterDeclined = true;
//     await existingUser.save();

//     res.status(201).json({ message: "Erfolgreich abonniert" });
//   } catch (error) {
//     console.error("Fehler beim Abonnement:", error);
//     res.status(500).json({ message: "Interner Serverfehler" });
//   }
// });

// // Benutzerinformationen abrufen
// app.get("/user", async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, "my_super_secret_key_1234567890");
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "Benutzer nicht gefunden" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Fehler beim Abrufen des Benutzers:", error);
//     res.status(500).json({ message: "Interner Serverfehler" });
//   }
// });

// //All users

// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find().select("firstName lastName");
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Fehler beim Abrufen der Benutzer:", error);
//     res.status(500).json({ message: "Interner Serverfehler" });
//   }
// });

// // API-Routen für Posts, Authentifizierung und Chat
// const postRoutes = require("./routes/post");
// const authRoutes = require("./routes/auth");
// const messageRoutes = require("./routes/messages");
// // const chatRoutes = require('./routes/chat');

// app.use("/api/post", postRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/messages", messageRoutes);
// // app.use('/api/chat', chatRoutes);

// // Add block socket
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("sendMessage", async (data) => {
//     try {
//       const { token, content } = data;
//       const decoded = jwt.verify(token, jwtSecret);
//       const user = await User.findById(decoded.userId);

//       if (!user) {
//         return socket.emit("error", { message: "Invalid token" });
//       }

//       const message = new Message({
//         sender: user._id,
//         content,
//       });

//       await message.save();

//       io.emit("newMessage", {
//         sender: { firstName: user.firstName, lastName: user.lastName },
//         content,
//         timestamp: message.timestamp,
//       });
//     } catch (error) {
//       console.error("Error sending message:", error);
//       socket.emit("error", { message: "Internal server error" });
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server läuft auf Port ${port}`);
// });

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const http = require("http");
// const bcrypt = require("bcrypt");
// const cors = require("cors");
// const jwt = require("jsonwebtoken");
// const path = require("path");
// const socketIo = require("socket.io");
// const User = require("./models/user");
// const Message = require("./models/Message");
// const fs = require("fs");
// const Subscriber = require("./models/subscriber");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.use(express.json());
// app.use(cors());

// const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/chat";
// mongoose.set("debug", true);
// mongoose
//   .connect(mongoURL)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });

// mongoose.connection.on("error", (err) => {
//   console.error("MongoDB connection error:", err);
// });

// const jwtSecret = process.env.JWT_SECRET;
// const bcryptSalt = bcrypt.genSaltSync(10);

// const uploadDir = "uploads";
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// app.use("/uploads", express.static(path.join(__dirname, uploadDir)));

// // Registration
// app.post("/register", async (req, res) => {
//   try {
//     const { email, firstName, lastName, birthdate, password } = req.body;

//     if (!email || !firstName || !lastName || !birthdate || !password) {
//       return res.status(400).json({ message: "Alle Felder sind erforderlich" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Benutzer existiert bereits" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       email,
//       firstName,
//       lastName,
//       birthdate,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     res.status(201).json({ message: "Benutzer erfolgreich registriert" });
//   } catch (error) {
//     console.error("Fehler bei der Registrierung:", error);
//     res
//       .status(500)
//       .json({ message: "Interner Serverfehler", error: error.message });
//   }
// });

// // Login
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email und Passwort sind erforderlich" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Benutzer nicht gefunden" });
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Ungültiges Passwort" });
//     }

//     const token = jwt.sign({ userId: user._id }, jwtSecret, {
//       expiresIn: "1h",
//     });

//     const existingSubscriber = await Subscriber.findOne({ email });
//     let showNewsletterPopup = false;
//     if (!existingSubscriber) {
//       showNewsletterPopup = true;
//     }

//     res.status(200).json({
//       message: "Login erfolgreich",
//       token,
//       showNewsletterPopup,
//     });
//   } catch (error) {
//     console.error("Fehler beim Login:", error);
//     res.status(500).json({ message: "Interner Serverfehler" });
//   }
// });

// // Newsletter-Abonnement
// app.post("/decline-newsletter", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ message: "Email ist erforderlich" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (!existingUser) {
//       return res.status(400).json({ message: "Benutzer bereits abonniert" });
//     }

//     const newSubscriber = new Subscriber({ email });
//     await newSubscriber.save();
//     existingUser.newsletterDeclined = true;
//     await existingUser.save();

//     res.status(201).json({ message: "Erfolgreich abonniert" });
//   } catch (error) {
//     console.error("Fehler beim Abonnement:", error);
//     res.status(500).json({ message: "Interner Serverfehler" });
//   }
// });

// // Benutzerinformationen abrufen
// app.get("/user", async (req, res) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, jwtSecret);
//     const user = await User.findById(decoded.userId).select("-password");
//     if (!user) {
//       return res.status(404).json({ message: "Benutzer nicht gefunden" });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error("Fehler beim Abrufen des Benutzers:", error);
//     res.status(500).json({ message: "Interner Serverfehler" });
//   }
// });

// // All users
// app.get("/users", async (req, res) => {
//   try {
//     const users = await User.find().select("firstName lastName");
//     res.status(200).json(users);
//   } catch (error) {
//     console.error("Fehler beim Abrufen der Benutzer:", error);
//     res.status(500).json({ message: "Interner Serverfehler" });
//   }
// });

// // Add block socket
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("sendMessage", async (data) => {
//     try {
//       const { token, content } = data;
//       const decoded = jwt.verify(token, jwtSecret);
//       const user = await User.findById(decoded.userId);

//       if (!user) {
//         return socket.emit("error", { message: "Invalid token" });
//       }

//       const message = new Message({
//         sender: user._id,
//         content,
//       });

//       await message.save();

//       io.emit("newMessage", {
//         sender: { firstName: user.firstName, lastName: user.lastName },
//         content,
//         timestamp: message.timestamp,
//       });
//     } catch (error) {
//       console.error("Error sending message:", error);
//       socket.emit("error", { message: "Internal server error" });
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// const port = process.env.PORT || 5000;
// server.listen(port, () => {
//   console.log(`Server läuft auf Port ${port}`);
// });

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
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", methods: ["GET", "POST"] }));

const mongoURL = process.env.MONGO_URL || "mongodb://localhost:27017/chat";
mongoose.set("debug", true);
mongoose
  .connect(mongoURL)
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

app.use("/api/posts", postRoutes);

// Registration

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
    console.error("Fehler bei der Registrierung:", error);
    res
      .status(500)
      .json({ message: "Interner Serverfehler", error: error.message });
  }
});

// Login
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
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1h",
    });
    const existingSubscriber = await Subscriber.findOne({ email });
    let showNewsletterPopup = false;
    if (!existingSubscriber) {
      showNewsletterPopup = true;
    }
    res
      .status(200)
      .json({ message: "Login erfolgreich", token, showNewsletterPopup });
  } catch (error) {
    console.error("Fehler beim Login:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

// Newsletter-Abonnement
app.post("/decline-newsletter", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email ist erforderlich" });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "Benutzer bereits abonniert" });
    }
    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    existingUser.newsletterDeclined = true;
    await existingUser.save();
    res.status(201).json({ message: "Erfolgreich abonniert" });
  } catch (error) {
    console.error("Fehler beim Abonnement:", error);
    res.status(500).json({ message: "Interner Serverfehler" });
  }
});

// Benutzerinformationen abrufen
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
      const decoded = jwt.verify(token, jwtSecret);
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
      console.error("Error sending message:", error);
      socket.emit("error", { message: "Internal server error" });
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.use("/api/posts", postRoutes);
app.use("/messages", messageRoutes);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server läuft auf Port ${port}`);
});
