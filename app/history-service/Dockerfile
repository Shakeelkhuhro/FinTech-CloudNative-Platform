# Stage 1: Build
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod tidy
RUN go build -o history-service .

# Stage 2: Run
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/history-service .
EXPOSE 8083
CMD ["./history-service"]
