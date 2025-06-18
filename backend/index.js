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

const server = http.createServer(app);

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
