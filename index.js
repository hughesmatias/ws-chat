const express = require("express");
var app = express();
var server = require('http').Server(app);

app.get('/', (req, res) => {
  res.send('Hi');
})

server.listen(8080, () => {
  console.log('Server running in 8080');
});
