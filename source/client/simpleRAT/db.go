package client

import (
	"os"

	"gopkg.in/yaml.v3"
)

type DB struct {
	file string
}

func NewDB(file string) *DB {
	return &DB{
		file: file,
	}
}

func (db *DB) Save(conf *Config) error {

	out, err := yaml.Marshal(conf)
	if err != nil {
		return err
	}

	return os.WriteFile(db.file, out, 0755)
}

func (db *DB) Load() (*Config, error) {

	out, err := os.ReadFile(db.file)
	if err != nil {
		return nil, err
	}
	conf := &Config{}

	err = yaml.Unmarshal(out, conf)
	if err != nil {
		return nil, err
	}

	return conf, nil
}
