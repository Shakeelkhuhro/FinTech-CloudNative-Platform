# Stage 1: Build
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY . .
RUN go mod tidy
RUN go build -o transaction-service .

# Stage 2: Run
FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/transaction-service .
EXPOSE 8082
CMD ["./transaction-service"]
