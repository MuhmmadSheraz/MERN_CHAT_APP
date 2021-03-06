const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const router = require("./router");
const { addUser, removeUser, getUser } = require("./utils/user.js");
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(router);

// Socket.io Work
io.on("connect", function (socket) {
  console.log("Socket Connected.");

  socket.on("joinChat", ({ name, room }, callback) => {
    console.log(name, room, socket.id);
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    console.log(`${user.name} Joined The Chat`);

    // Joining User In a Room
    socket.join(user.room);

    // Bot Message
    socket.emit("message", {
      user: "admin",
      messageBody: `${user.name} Welcome to Room ${user.room}`,
    });
    //Bot Message For All Except the User Whose joining
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      messageBody: `${user.name} has Joined The Room`,
    });

    callback();
  });

  // Send Message

  socket.on("sendMessage", (messageBody, callback) => {
    console.log("Send Messgae");
    const user = getUser(socket.id);

  console.log("user",user)
    io.to(user.room).emit("message", { user: user.name, messageBody });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        messageBody: `${user.name} has left.`,
      });
    }
  });
});

// Start Server
const PORT = 8000;
server.listen(PORT, () => console.log(`Server has started At ${PORT}`));
