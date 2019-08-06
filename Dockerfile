# golang image where workspace (GOPATH) configured at /go.
FROM golang

# Copy the local package files to the container’s workspace.
ADD . /go/src/github.com/shijuvar/go-web/taskmanager

# Setting up working directory
WORKDIR /go/src/github.com/shijuvar/go-web/taskmanager

# Get godeps for managing and restoring dependencies
RUN go get -u github.com/golang/dep/cmd/dep

# Restore godep dependencies
RUN dep ensure

# Build the taskmanager command inside the container.
RUN go install github.com/shijuvar/go-web/taskmanager

# Run the taskmanager command when the container starts.
ENTRYPOINT /go/bin/taskmanager

# Service listens on port 8080.
EXPOSE 8080