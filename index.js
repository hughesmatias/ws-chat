const express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
  name: 'God',
  message: `a message ... ${new Date().getMilliseconds()}`
}];

var typping = [];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hi world!');
});

io.on("connection", socket => {
 //socket is client what is connection
 socket.emit("messages", messages);

 socket.on("new-message", (data) => {
   messages.push(data);

   io.sockets.emit('messages', messages);
 });

 socket.on("is-typping", data => {
  // data is a user
  if (typping.filter(user => user == data).length < 1) {
    typping.push(data);
  }
  io.sockets.emit('typping', typping);
 });

 socket.on("is-not-typping", data => {
  // data is a user
  typping = typping.filter(user => user != data);
  io.sockets.emit('typping', typping);
 });
});

server.listen(8090, () => {
  console.log('Server running in 8090');
});
