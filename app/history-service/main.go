package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("supersecretkey") // Should match User Service

type Transaction struct {
	ID     string  `json:"id"`
	Amount float64 `json:"amount"`
	Type   string  `json:"type"`
}

// In-memory user transaction storage: map[user] -> []Transaction
var userTransactions = make(map[string][]Transaction)

// JWT middleware
func jwtAuthMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			http.Error(w, "Missing or invalid Authorization header", http.StatusUnauthorized)
			return
		}
		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims := &jwt.RegisteredClaims{}
		token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})
		if err != nil || !token.Valid {
			http.Error(w, "Invalid token", http.StatusUnauthorized)
			return
		}
		// Attach username to context (for simplicity, use subject claim)
		username := claims.Subject
		if username == "" {
			http.Error(w, "Invalid token claims", http.StatusUnauthorized)
			return
		}
		// Set username in request context (or header for simplicity)
		r.Header.Set("X-User", username)
		next(w, r)
	}
}

// POST /transaction {amount, type: credit|debit}
func transactionHandler(w http.ResponseWriter, r *http.Request) {
	username := r.Header.Get("X-User")
	if username == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var req struct {
		Amount float64 `json:"amount"`
		Type   string  `json:"type"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || (req.Type != "credit" && req.Type != "debit") {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	tx := Transaction{
		ID:     fmt.Sprintf("%d", rand.Int63()),
		Amount: req.Amount,
		Type:   req.Type,
	}
	userTransactions[username] = append(userTransactions[username], tx)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(tx)
}

// GET /history
func historyHandler(w http.ResponseWriter, r *http.Request) {
	username := r.Header.Get("X-User")
	if username == "" {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	txs := userTransactions[username]
	json.NewEncoder(w).Encode(txs)
}

func main() {
	rand.Seed(time.Now().UnixNano())
	http.HandleFunc("/transaction", jwtAuthMiddleware(transactionHandler))
	http.HandleFunc("/history", jwtAuthMiddleware(historyHandler))
	log.Println("History Service running on :8083")
	log.Fatal(http.ListenAndServe(":8083", nil))
}
