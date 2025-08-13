const express = require("express");
const http = require("http"); // ✅ fixed typo
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app); // ✅ fixed variable name
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log("User connected", socket.id);

    socket.on("codeChange", (data) => {
        console.log("Received CodeChange from:", socket.id, ":", data); // ✅ fixed
        socket.broadcast.emit("codeChange", data); // ✅ sends to all except sender
    });

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
    });
});

server.listen(4000, () => {
    console.log("Server is running on port 4000");
});
