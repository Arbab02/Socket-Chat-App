const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname + '/public'));

const messageHistory = []; // Store message history

io.on('connection', (socket) => {
  console.log('A user connected');

  // Send message history to new user
  socket.emit('message history', messageHistory);

  socket.on('chat message', (msg) => {
    messageHistory.push(msg); // Save the message to history
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
