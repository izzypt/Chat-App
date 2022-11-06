/**********
* IMPORTS * 
***********/
const express = require('express')
const cors = require('cors')
const http = require('http');
const { Server, } = require('socket.io')

/*************
* INITIALIZE * 
**************/
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
/********
* LOGIC * 
*********/
io.on("connection", (socket) => {
    console.log(`User ${socket.id} connected`)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })
    socket.on("send_message", (message) => {
        socket.to(message.room).emit("receive_message", message)
    })
    socket.on("disconnect", () => {
        console.log("Users Disconnected: ", socket.id)
    })
})

/*************
* MIDDLEWARE * 
**************/
app.use(cors());





/**********
* LISTEN *
***********/
server.listen(5000, () => {
    console.log("Listening on port 5000;")
})