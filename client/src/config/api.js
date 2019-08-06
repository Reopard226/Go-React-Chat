const getSocketURL = () => {
  let rawURL = process.env.REACT_APP_ENDPOINT
  rawURL = rawURL.substr(rawURL.indexOf('://') + 3)
  rawURL = 'ws://' + rawURL + '/ws'
  return rawURL
}

var socket = new WebSocket(getSocketURL());

let connect = (cb) => {
  console.log("connecting")

  socket.onopen = () => {
    console.log("Successfully Connected");
  }
  
  socket.onmessage = (msg) => {
    cb(msg);
  }

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event)
  }

  socket.onerror = (error) => {
    console.log("Socket Error: ", error)
  }
};

let sendMsg = (msg) => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

export { connect, sendMsg };
