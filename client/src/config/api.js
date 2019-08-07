const getSocketURL = () => {
  let rawURL = process.env.REACT_APP_ENDPOINT
  rawURL = rawURL.substr(rawURL.indexOf('://') + 3)
  rawURL = 'ws://' + rawURL + '/ws'
  return rawURL
}

let connect = (cb, getHistory) => {
  console.log("connecting")
  let socket = new WebSocket(getSocketURL());
  getHistory()

  socket.onopen = () => {
    console.log("Successfully Connected");
  }
  
  socket.onmessage = (msg) => {
    cb(msg);
  }

  socket.onclose = (event) => {
    console.log("Socket Closed Connection: ", event)
    setTimeout(() => connect(cb, getHistory), 30000)
  }

  socket.onerror = (error) => {
    console.log("Socket Error: ", error)
  }

};

export { connect };
