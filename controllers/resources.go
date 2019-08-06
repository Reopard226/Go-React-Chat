package controllers

import (
	"github.com/Reopard226/go-react-chat/models"
)

//Models for JSON resources
type (
	//For Post - /user/register
	UserResource struct {
		Data models.User `json:"data"`
	}
	//For Post - /user/login
	LoginResource struct {
		Data LoginModel `json:"data"`
	}
	//Response for authorized user Post - /user/login
	AuthUserResource struct {
		Data AuthUserModel `json:"data"`
	}

	// For Post/Put - /messages
	MessageResource struct {
		Data MessageModel `json:"data"`
	}

	MessagesResource struct {
		Data []models.Message `json:"data"`
	}

	//Model for authentication
	LoginModel struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	//Model for authorized user with access token
	AuthUserModel struct {
		User  models.User `json:"user"`
		Token string      `json:"token"`
	}
	//Model for a TaskMessage
	MessageModel struct {
		Content string `json:"content"`
	}
)
