var socket = io.connect("http://localhost:8090", { 'forceNew': true });

socket.on("messages", data => {
  render(data);
});

socket.on("typping", data => {
  renderTypping(data);
});

const sendMessage = (e) => {
  var message = {
    name: document.getElementById('username').value,
    message: document.getElementById('text').value
  };

  socket.emit("new-message", message);
  return false;
};

const toogleTypping = (action) => {
  socket.emit(action, document.getElementById('username').value);
  return false;
}

const isTypping = (e) => {
  toogleTypping("is-typping");
};

const isNotTypping = (e) => {
  toogleTypping("is-not-typping");
}

const render = data => {
  var html = data.map(elem => {
    return `<div>${elem.name}: - ${elem.message}</div>`;
  }).join("");
  document.getElementById("messages").innerHTML = html;
};

const renderTypping = data => {
  var html = data.map(elem => {
    return `<div>${elem} is typping...</div>`;
  }).join("");

  document.getElementById("activity").innerHTML = html;
};