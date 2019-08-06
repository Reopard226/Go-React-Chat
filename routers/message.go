package routers

import (
	"github.com/Reopard226/go-react-chat/common"
	"github.com/Reopard226/go-react-chat/controllers"
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

// SetMessageRoutes configures routes for message entity
func SetMessageRoutes(router *mux.Router) *mux.Router {
	messageRouter := mux.NewRouter()
	messageRouter.HandleFunc("/messages", controllers.CreateMessage).Methods("POST")
	messageRouter.HandleFunc("/messages", controllers.GetMessages).Methods("GET")
	router.PathPrefix("/messages").Handler(negroni.New(
		negroni.HandlerFunc(common.Authorize),
		negroni.Wrap(messageRouter),
	))
	return router
}
