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
		if spoon.Owner != e {
			time.Sleep(time.Nanosecond)
			continue
		}

		if second.IsHungry {
			fmt.Printf("%s: Please, be my guest %s\n", e.Name, second.Name)
			spoon.Owner = second
			continue
		}
		spoon.Use()
		e.IsHungry = false
		fmt.Printf("%s: I am stuffed, your turn %s\n", e.Name, second.Name)
		spoon.Owner = second
	}
}

type Spoon struct {
	Owner *Eater
}

func (s *Spoon) Use() {
	fmt.Printf("%s has eaten", s.Owner.Name)
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
