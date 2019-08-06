package routers

import (
	"github.com/gorilla/mux"
	"github.com/matthew/go-react-chat/controllers"
)

func SetUserRoutes(router *mux.Router) *mux.Router {
	router.HandleFunc("/signup", controllers.Register).Methods("POST")
	router.HandleFunc("/login", controllers.Login).Methods("POST")
	return router
}
