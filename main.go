package main

import (
	"log"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/handlers"
	common "github.com/matthew/go-react-chat/common"
	"github.com/matthew/go-react-chat/routers"
	"github.com/matthew/go-react-chat/websocket"
)

const STATIC_DIR = "./client/build"

//Entry point of the program
func main() {
	websocket.NewPoolStart()
	router := routers.InitRoutes()
	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir(STATIC_DIR))))
	headers := handlers.AllowedHeaders([]string{"X-Request-With", "Content-Type", "Authorization"})
	methods := handlers.AllowedMethods([]string{"GET", "POST"})
	origins := handlers.AllowedOrigins([]string{"*"})
	// Create a negroni instance
	n := negroni.Classic()
	n.UseHandler(router)
	server := &http.Server{
		Addr:    common.AppConfig.Server,
		Handler: handlers.CORS(headers, methods, origins)(n),
	}
	log.Println("Listening...")
	server.ListenAndServe()
}
