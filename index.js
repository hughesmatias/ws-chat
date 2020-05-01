const express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
  name: 'God',
  message: `a message ... ${new Date().getMilliseconds()}`
}];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hi world!');
});

io.on("connection", socket => {
 //socket is client what is connection
 socket.emit("messages", messages);

 socket.on("new-message", (data) => {
   console.log(data, "dataaaa");
   messages.push(data);

   io.sockets.emit('messages', messages);
 })
});

server.listen(8080, () => {
  console.log('Server running in 8080');
});
