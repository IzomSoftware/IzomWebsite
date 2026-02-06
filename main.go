package main

import (
	"net/http"

	httpscore "github.com/IzomSoftware/GinWrapper/https/core" 
	logger "github.com/IzomSoftware/GinWrapper/common/logger"
	configuration "github.com/IzomSoftware/GinWrapper/common/configuration"

	"github.com/gin-gonic/gin"
)

var (
	HttpsServer httpscore.HttpsServer
)

func main() {
	logger.SetupLogger("Izom.Net")

  // Adjust as needed
	configuration.DefaultConfig =
		configuration.Holder{
			Debug: false,
			HTTPSServer: configuration.HTTPSServer{
				Enabled:      true,
				Address:      "0.0.0.0",
				Port:         2009,
				APIUserAgent: "Test Client 1.0/b (Software)",
				TlsConfiguration: configuration.HttpsTlsConfiguration{
					Enable:   false,
					CertFile: "cert.pem",
					KeyFile:  "key.pem",
				},
			},
		}
  // setup configuration
	configuration.SetupConfig("config.toml")

  // add responses 
	httpscore.Responses["index"] = httpscore.Response{
		Fn: func(c *gin.Context) {
			c.HTML(http.StatusOK, "home.html", nil)
		},
		Method:    "GET",
		Addresses: []string{"/", "/home"},
	}

  // first argument is templateDir and second one is assetsDir
	HttpsServer.ListenAndServe("assets/templates/*", "/assets")
}