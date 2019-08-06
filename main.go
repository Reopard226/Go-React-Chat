package main

import (
	"log"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/handlers"
	common "github.com/matthew/go-react-chat/common"
	"github.com/matthew/go-react-chat/routers"
)

//Entry point of the program
func main() {

	//common.StartUp() - Replaced with init method
	// Get the mux router object
	router := routers.InitRoutes()
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
