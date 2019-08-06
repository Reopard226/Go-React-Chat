# golang image where workspace (GOPATH) configured at /go.
FROM golang

# Copy the local package files to the container’s workspace.
ADD . /go/src/github.com/Reopard226/go-react-chat

# Setting up working directory
WORKDIR /go/src/github.com/Reopard226/go-react-chat

# Get godeps for managing and restoring dependencies
RUN go get -u github.com/golang/dep/cmd/dep

# Restore godep dependencies
RUN dep ensure

RUN go install github.com/Reopard226/go-react-chat

ENTRYPOINT /go/bin/go-react-chat

# Service listens on port 8000.
EXPOSE 8000