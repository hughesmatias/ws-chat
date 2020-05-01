const express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.send('Hi world!');
});

io.on("connection", socket => {
 //socket is client what is connection
 socket.emit("messages", {
   message: `a message ... ${new Date().getMilliseconds()}`
 })
})

server.listen(8080, () => {
  console.log('Server running in 8080');
});
