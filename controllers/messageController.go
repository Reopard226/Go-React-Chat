package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"gopkg.in/mgo.v2/bson"

	"github.com/matthew/go-react-chat/common"
	"github.com/matthew/go-react-chat/data"
	"github.com/matthew/go-react-chat/models"
)

// CreateMessage inserts a new Message document for a UserId
// Handler for HTTP Post - "/messages"
func CreateMessage(w http.ResponseWriter, r *http.Request) {
	var dataResource MessageResource
	// Decode the incoming Message json
	err := json.NewDecoder(r.Body).Decode(&dataResource)
	if err != nil {
		common.DisplayAppError(w, err, "Invalid message data", 500)
		return
	}
	messageModel := dataResource.Data
	message := &models.Message{
		UserId:   bson.ObjectIdHex(fmt.Sprintf("%v", r.Context().Value("userid"))),
		UserName: fmt.Sprintf("%v", r.Context().Value("username")),
		Content:  messageModel.Content,
	}
	context := NewContext()
	defer context.Close()
	col := context.DbCollection("messages")
	//Insert a Message document
	repo := &data.MessageRepository{C: col}
	repo.Create(message)
	j, err := json.Marshal(message)
	if err != nil {
		common.DisplayAppError(w, err, "An unexpected error has occurred", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(j)
}

// GetMessages returns all Message documents
// Handler for HTTP Get - "/messages"
func GetMessages(w http.ResponseWriter, r *http.Request) {
	context := NewContext()
	defer context.Close()
	col := context.DbCollection("messages")
	repo := &data.MessageRepository{C: col}
	messages := repo.GetAll()
	j, err := json.Marshal(MessagesResource{Data: messages})
	if err != nil {
		common.DisplayAppError(w, err, "An unexpected error has occurred", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}
