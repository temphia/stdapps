package client

import (
	"encoding/json"
	"sync"
	"time"

	"github.com/dop251/goja"
	"github.com/k0kubun/pp"
)

type Client struct {
	db    *DB
	conf  *Config
	mLock sync.Mutex

	resultsChan chan Result

	// control chans

	startService  chan string
	stopService   chan string
	reloadService chan string

	activeServices map[string]*Service
}

func New(file string) (*Client, error) {

	d := NewDB(file)

	conf, err := d.Load()
	if err != nil {
		return nil, err
	}

	return &Client{
		db:          d,
		conf:        conf,
		mLock:       sync.Mutex{},
		resultsChan: make(chan Result),

		startService:  make(chan string),
		stopService:   make(chan string),
		reloadService: make(chan string),

		activeServices: make(map[string]*Service),
	}, nil
}

/*

	-> DeviceLogin
	-> self.listApps
	-> execTargetApp() target type

*/

func (c *Client) Run() error {
	go c.runSubmitLoop()

	go c.runControlLoop()

	for skey := range c.conf.Services {
		c.startService <- skey
	}

	time.Sleep(time.Hour)

	return nil
}

func (c *Client) runControlLoop() {

	for {

		select {
		case name := <-c.startService:
			svc := c.activeServices[name]
			if svc != nil {
				delete(c.activeServices, name)
				svc.closed = true
			}

			c.runService(name)
		case name := <-c.stopService:
			svc := c.activeServices[name]
			if svc != nil {
				svc.closed = true
			}

		case name := <-c.reloadService:
			svc := c.activeServices[name]
			if svc != nil {
				delete(c.activeServices, name)
				svc.closed = true
			}

			c.runService(name)
		}

	}

}

func (c *Client) runService(name string) {
	smodel := c.conf.Services[name]
	if smodel == nil {
		return
	}

	svc := &Service{
		name:        name,
		runtime:     goja.New(),
		model:       smodel,
		closed:      false,
		resultsChan: c.resultsChan,
	}
	c.activeServices[name] = svc
	go svc.run()
}

func (c *Client) runSubmitLoop() {

	for {
		r := <-c.resultsChan

		out, err := json.Marshal(&r)
		if err != nil {
			panic(err)
		}

		pp.Println("@todo_submit", string(out))
	}
}
