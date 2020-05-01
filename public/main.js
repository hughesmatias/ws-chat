var socket = io.connect("http://localhost:8080", { 'forceNew': true });

socket.on("messages", data => {
  render(data);
});

const sendMessage = (e) => {
  var message = {
    name: document.getElementById('username').value,
    message: document.getElementById('text').value
  };

  socket.emit("new-message", message);
  return false;
};

const render = data => {

  var html = data.map(elem => {
    return `<div>${elem.name}: - ${elem.message}</div>`;
  }).join("");
  document.getElementById("messages").innerHTML = html;
};

