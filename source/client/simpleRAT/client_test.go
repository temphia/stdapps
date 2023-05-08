package client

import "testing"

func TestClient(t *testing.T) {

	c, err := New("testdata/config.yaml")
	if err != nil {
		t.Fatal(err)
	}

	err = c.Run()
	if err != nil {
		t.Fatal(err)
	}

}
