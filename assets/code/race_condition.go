package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

type Account struct {
	Balance int
	m       sync.Mutex
}

func NewAccount(balance int) *Account {
	return &Account{
		Balance: balance,
		m:       sync.Mutex{},
	}
}

func (a *Account) Earn(amount int) {
	// simulate hard work
	r := time.Duration(rand.Intn(10)) * time.Nanosecond
	time.Sleep(r)

	a.m.Lock()
	a.Balance += amount
	a.m.Unlock()
}

func (a *Account) Spend(amount int) {
	// simulate hard work
	r := time.Duration(rand.Intn(10)) * time.Nanosecond
	time.Sleep(r)

	a.m.Lock()
	if a.Balance >= amount {
		a.Balance -= amount
	}
	a.m.Unlock()
}

func main() {
	acc := NewAccount(100)
	// Author suppose Earn happens before Spend
	// But, the code does not guarantee that
	go acc.Earn(50)
	go acc.Spend(130)

	// wait for goroutines
	time.Sleep(1 * time.Second)
	fmt.Println(acc.Balance)
}
