package routers

import (
	"fmt"
	"net/http"

	"github.com/Reopard226/go-react-chat/controllers"
	"github.com/Reopard226/go-react-chat/websocket"
	"github.com/gorilla/mux"
)

func serveWs(pool *websocket.Pool, w http.ResponseWriter, r *http.Request) {
	fmt.Println("WebSocket Endpoint Hit")
	conn, err := websocket.Upgrade(w, r)
	if err != nil {
		fmt.Fprintf(w, "%+v\n", err)
	}

	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client
	client.Read()
}

func SetUserRoutes(router *mux.Router) *mux.Router {
	router.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		serveWs(websocket.MainPool, w, r)
	})
	router.HandleFunc("/signup", controllers.Register).Methods("POST")
	router.HandleFunc("/login", controllers.Login).Methods("POST")
	return router
}
