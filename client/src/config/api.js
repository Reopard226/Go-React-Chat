const getSocketURL = () => {
  let rawURL = process.env.REACT_APP_ENDPOINT
  rawURL = rawURL.substr(rawURL.indexOf('://') + 3)
  rawURL = 'ws://' + rawURL + '/ws'
  return rawURL
}

let socket = new WebSocket(getSocketURL());
let pingHandler;
let instance = 0

let connect = (cb) => {
  console.log("connecting")

  socket.onopen = () => {
    console.log("Successfully Connected");
  }
  
  socket.onmessage = (msg) => {
    cb(msg);
    if(instance === 0) {
      instance = 1
      pingWS()
    } 
  }

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event)
  }

  socket.onerror = (error) => {
    console.log("Socket Error: ", error)
  }

};

let pingWS = () => {
  socket.send('ping');
  pingHandler = setTimeout(pingWS, 20000)
};

let stopPing = () => {
  instance = 0
  clearTimeout(pingHandler)
}

export { connect };
