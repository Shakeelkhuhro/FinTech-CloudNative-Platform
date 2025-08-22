# Stage 1: Build
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod tidy
RUN go build -o user-service .

# Stage 2: Run
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/user-service .
EXPOSE 8081
CMD ["./user-service"]
