package data

import (
	"time"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

	"github.com/Reopard226/go-react-chat/models"
)

type MessageRepository struct {
	C *mgo.Collection
}

func (r *MessageRepository) Create(message *models.Message) error {
	obj_id := bson.NewObjectId()
	message.Id = obj_id
	message.CreatedOn = time.Now()
	err := r.C.Insert(&message)
	return err
}

func (r *MessageRepository) GetAll() []models.Message {
	var messages []models.Message
	iter := r.C.Find(nil).Iter()
	result := models.Message{}
	for iter.Next(&result) {
		messages = append(messages, result)
	}
	return messages
}
