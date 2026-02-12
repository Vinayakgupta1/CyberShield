FROM golang:1.25-alpine AS build
RUN go install github.com/OJ/gobuster/v3@latest

FROM alpine:3.19
COPY --from=build /go/bin/gobuster /usr/local/bin/gobuster
ENTRYPOINT ["gobuster"]
