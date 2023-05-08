package client

type Config struct {
	Server      string                   `json:"server,omitempty" yaml:"server,omitempty"`
	DeviceToken string                   `json:"device_token,omitempty" yaml:"device_token,omitempty"`
	Services    map[string]*ServiceModel `json:"services,omitempty" yaml:"services,omitempty"`
}

type ServiceModel struct {
	Code        string `json:"code,omitempty" yaml:"code,omitempty"`
	PollTime    int64  `json:"poll_time,omitempty" yaml:"poll_time,omitempty"`
	PublishMode string `json:"publish_mode,omitempty" yaml:"publish_mode,omitempty"`
	Enabled     bool   `json:"enabled,omitempty" yaml:"enabled,omitempty"`
}

type Result struct {
	Name    string `json:"name,omitempty"`
	Type    string `json:"type,omitempty"`
	Payload any    `json:"payload,omitempty"`
}
