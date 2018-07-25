// Ezecutable example https://play.golang.org/p/B6whTeooSFV

package main

import (
	"fmt"
	"sync"
	"time"
)

type Eater struct {
	Name     string
	IsHungry bool
}

func NewEater(n string) *Eater {
	return &Eater{
		Name:     n,
		IsHungry: true,
	}
}

func (e *Eater) EatWith(spoon *Spoon, second *Eater) {
	for e.IsHungry {
		if !spoon.IsOwner(e) {
			time.Sleep(time.Millisecond)
			continue
		}

		if second.IsHungry {
			fmt.Printf(
				"%s: Be my guest %s\n",
				e.Name, second.Name,
			)
			spoon.SetOwner(second)
			continue
		}

		spoon.Use()
		e.IsHungry = false
		fmt.Printf(
			"%s: I am stuffed, your turn %s\n",
			e.Name, second.Name,
		)
		spoon.SetOwner(second)
	}
}

type Spoon struct {
	mu    sync.Mutex
	Owner *Eater
}

func (s *Spoon) Use() {
	s.mu.Lock()
	fmt.Printf("%s has eaten", s.Owner.Name)
	s.mu.Unlock()
}

func (s *Spoon) SetOwner(e *Eater) {
	s.mu.Lock()
	s.Owner = e
	s.mu.Unlock()
}

func (s *Spoon) IsOwner(e *Eater) bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.Owner == e

}

func main() {
	alice := NewEater("Alice")
	bob := NewEater("Bob")
	spoon := Spoon{Owner: bob}

	wg := sync.WaitGroup{}
	wg.Add(2)

	go func() {
		defer wg.Done()
		bob.EatWith(&spoon, alice)
	}()

	go func() {
		defer wg.Done()
		alice.EatWith(&spoon, bob)
	}()
	wg.Wait()
}
