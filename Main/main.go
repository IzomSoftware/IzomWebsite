package main

import (
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/IzomSoftware/GinWrapper/authentication"
	"github.com/IzomSoftware/GinWrapper/configuration"
	"github.com/IzomSoftware/GinWrapper/logger"
	"github.com/IzomSoftware/GinWrapper/middleware"
	"github.com/IzomSoftware/GinWrapper/server"
	"github.com/IzomSoftware/GinWrapper/storage"
	"github.com/gin-gonic/gin"
)

const creationSchema = `
	CREATE TABLE IF NOT EXISTS Users (
		username TEXT PRIMARY KEY,
		hash TEXT NOT NULL
	);
	CREATE TABLE IF NOT EXISTS BannedIPs (
		ip TEXT PRIMARY KEY
	);
`
func handleHomePage(c *gin.Context) {
	c.HTML(http.StatusOK, "home.html", nil)
}
func handleAboutUsPage(c *gin.Context) {
	c.HTML(http.StatusOK, "about-us.html", nil)
}
func handleColleaguesPage(c *gin.Context) {
	c.HTML(http.StatusOK, "colleagues.html", nil)
}
func handleContactUsPage(c *gin.Context) {
	c.HTML(http.StatusOK, "contact-us.html", nil)
}
func handleMembersPage(c *gin.Context) {
	c.HTML(http.StatusOK, "members.html", nil)
}

func main() {
	configuration, err := configuration.LoadConfiguration("config.toml")
	if err != nil {
		panic("Failed to initialize configuration")
	}

	logLevel := slog.LevelInfo
	if configuration.Debug {
		logLevel = slog.LevelDebug
	}
	logger.SetupLogger(slog.NewTextHandler(os.Stdout, &slog.HandlerOptions{Level: logLevel}))

	storage, err := storage.New(configuration, creationSchema)
	if err != nil {
		panic("Failed to intiialize storage")
	}
	defer storage.Close()

	jwtManager := authentication.NewJWTManager(
		configuration.Protections.JWTProtection.JWTSecret,
		"GinWrapper",
		time.Duration(configuration.Protections.JWTProtection.JWTExpiration)*time.Second,
		24*time.Hour,
	)

	server := server.NewServer(configuration, storage, jwtManager)
	server.Use(gin.Recovery(), middleware.Logging())

	if storage.Redis != nil {
		server.Use(middleware.BanCheck(storage.Redis))
		if configuration.Protections.RateLimitProtection.Enabled {
			server.Use(middleware.RateLimit(storage.Redis, configuration.Protections.RateLimitProtection))
		}
	}

	handlers := map[string]map[string]gin.HandlerFunc{
		"GET": {
			"/":            handleHomePage,
			"/home":        handleHomePage,
			"/home/":       handleHomePage,
			"/about-us":    handleAboutUsPage,
			"/about-us/":   handleAboutUsPage,
			"/colleagues":  handleColleaguesPage,
			"/colleagues/": handleColleaguesPage,
			"/contact-us":  handleContactUsPage,
			"/contact-us/": handleContactUsPage,
			"/members":     handleMembersPage,
			"/members/":    handleMembersPage,
		},
	}

	server.RegisterRoutes(handlers)

	server.LoadTemplates(configuration.HTTPServer.TemplatesDir + "*")
	server.LoadStatics(configuration.HTTPServer.AssetsDir, configuration.HTTPServer.AssetsDir)

	if err := server.ListenAndServe(); err != nil {
		panic(fmt.Sprintf("Failed to listen: %v", err))
	}
}
