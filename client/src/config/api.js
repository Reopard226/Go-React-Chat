const getSocketURL = () => {
  let rawURL = process.env.REACT_APP_ENDPOINT
  rawURL = rawURL.substr(rawURL.indexOf('://') + 3)
  rawURL = 'ws://' + rawURL + '/ws'
  return rawURL
}

let socket = new WebSocket(getSocketURL());
let connected = false

let connect = (cb) => {
  console.log("connecting")

  socket.onopen = () => {
    console.log("Successfully Connected");
    connected = true
  }
  
  socket.onmessage = (msg) => {
    cb(msg);
  }

  socket.onclose = (event) => {
    connected = false
    console.log("Socket Closed Connection: ", event)
  }

  socket.onerror = (error) => {
    connected = false
    console.log("Socket Error: ", error)
  }

};

let pingWS = (cb) => {
  if (connected) socket.send('ping')
  else connect(cb)
  setTimeout(pingWS, 10000)
};

export { pingWS };
