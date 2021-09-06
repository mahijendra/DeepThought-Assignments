const express = require("express");
const app = express();
const http = require("http"); // Grabbing a variable from http Library in node Js
const cors = require("cors"); // Socket.io deals with a lots of cors issues, it helps to solve the bugs
const { Server } = require("socket.io"); // Importing a class called server which comes from the socket.io

app.use(cors());

const server = http.createServer(app); // Instantiating the server by creating something

// Connecting the socket.io server with the express one that we created {by passing "server"
const io = new Server(server, {
    //solving cors issues
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});


// How socket.io works is, We can actually initiate when someone actually connected  or joined the socket.io server.
// How socket.io works is based on events. You emit an event and you detect you listen for an event to happen.
// There are certain events that are build in socket.io like "connection" event is the one which detects when someone connects.
// When a user connects to the server, we create a callback function to grab the USER ID of the user, Since each user gets an ID when connected the the socket server.
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

// When user emits a event to join a room, Here we want to join based on the userId that was entered in the Front-end. So we need to send the roomId from front rnd to Back-end,
// We can achieve that when you create an  event like socket.on by giving in an name like "Join room" you can pass stuff like data.
// In order to know that data is roomId we need to pass it in the front end
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });

    // When user Disconnects from the server
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
});

server.listen(3001, () => {
    console.log("SERVER RUNNING");
});