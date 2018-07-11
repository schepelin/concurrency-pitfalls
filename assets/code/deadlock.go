package main

import (
	"sync"
	"time"
)

type Account struct {
	Balance int
	M       sync.Mutex
}

func NewAccount(balance int) *Account {
	return &Account{
		Balance: balance,
		M:       sync.Mutex{},
	}
}

func (acc *Account) Transfer(to *Account, amount int) {
	acc.M.Lock()
	// simulate latency
	time.Sleep(1 * time.Millisecond)

	acc.Balance -= amount

	to.M.Lock()
	to.Balance += amount
	to.M.Unlock()

	acc.M.Unlock()
}

func main() {
	alice := NewAccount(100)
	bob := NewAccount(500)

	wg := sync.WaitGroup{}
	wg.Add(2)

	go func() {
		defer wg.Done()
		alice.Transfer(bob, 50)
	}()

	go func() {
		defer wg.Done()
		bob.Transfer(alice, 200)
	}()
	wg.Wait()
}
