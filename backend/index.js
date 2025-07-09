require("dotenv").config();
const Message = require("./models/Message");

const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const socketIO = require("socket.io");
const http = require("http");

const app = express();
app.use(cors());
app.use(express.json());

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/", paymentRoutes);

const authRoutes = require("./routes/auth");
const { default: mongoose } = require("mongoose");
app.use("/", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/", userRoutes);

const server = http.createServer(app);

const router = express.Router();

// Delete all messages route
router.delete("/clear-messages", async (req, res) => {
  try {
    await Message.deleteMany({});
    res.status(200).json({ success: true, message: "Chat history cleared" });
    io.emit("chat_history", []);
  } catch (err) {
    res.status(500).json({ error: "Failed to clear chat history" });
  }
});

// Mongo Connect
mongoose
  .connect("mongodb://localhost:27017/React-Node-App", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Socket Io
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("send_message", async (data) => {
    console.log(data, "data");

    const newMessage = new Message({
      sender: data.sender,
      content: data.text
    })

    await newMessage.save();
    io.emit("receive_message", data);
  });

  // Chat History
  Message.find().sort({ timestamp: 1 }).limit(100).then((messages) => {
    socket.emit("chat_history", messages);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});


server.listen(5000, () => console.log("Server running on http://localhost:5000"));
