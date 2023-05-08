package client

import (
	"fmt"
	"log"
	"time"

	"github.com/dop251/goja"
	"github.com/k0kubun/pp"
)

type Service struct {
	name        string
	runtime     *goja.Runtime
	model       *ServiceModel
	closed      bool
	resultsChan chan Result
}

func (s *Service) run() {

	ptime := time.Duration(s.model.PollTime) * time.Millisecond
	if ptime == 0 {
		ptime = time.Second * 5
	}
	for {

		pp.Println("sleeping ", ptime.String())

		time.Sleep(ptime)

		val, err := s.runtime.RunString(s.model.Code)
		if err != nil {
			log.Println(err)
		}

		fmt.Println(s.name, val)

		obj := val.ToObject(s.runtime)

		s.resultsChan <- Result{
			Name:    s.name,
			Type:    "fixme",
			Payload: obj,
		}

		if s.closed {
			return
		}
	}

}
