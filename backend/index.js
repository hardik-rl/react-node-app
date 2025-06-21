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

const server = http.createServer(app);

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

  socket.on("send_message", (data) => {
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(5000, () => console.log("Server running on http://localhost:5000"));
