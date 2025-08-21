const express = require("express");
const http = require("http"); // ✅ FIXED
const { Server } = require("socket.io");
const cors = require("cors");
const users ={};

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  users[socket.id] ={ id: socket.id };
  io.emit("users", Object.values(users)); // ✅ send users to all
  
  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
    delete users[socket.id];
    io.emit("users", Object.values(users)); // ✅ update users list
  });

  socket.on("codeChange", (data) => {
    console.log("📩 Received codeChange from:", socket.id, ":", data);
    socket.broadcast.emit("codeChange", data); // ✅ send to others
  });

});

server.listen(4000, () => {
  console.log("🚀 Server is running on port 4000");
});
