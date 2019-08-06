package routers

import (
	"github.com/gorilla/mux"
)

func InitRoutes() *mux.Router {
	router := mux.NewRouter().StrictSlash(false)

	// Routes for the User entity
	router = SetUserRoutes(router)
	// Routes for the Message entity
	router = SetMessageRoutes(router)
	return router
}
