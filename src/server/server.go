package server

import (
	"fmt"
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Resposta struct {
	Resposta string `json:"resposta"`
}

func rootPage(c echo.Context) error {
	log.Println("/v1")
	return c.String(http.StatusOK, "hello world")
}

func quizExtra(c echo.Context) error {
	var req Resposta

	if err := c.Bind(&req); err != nil {
		fmt.Println("error")
	}

	if req.Resposta == "" {
		fmt.Println("Se tu não digitar um número, não vai saber a resposta! Se manca, ovo mole!")

	}

	return c.JSON(http.StatusOK, map[string]string{"mensagem": "Errou, diva! Eu te amo ∞⁰"})
}

func ServerLocal() {
	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{http.MethodGet, http.MethodPost},
	}))

	e.GET("/", rootPage)
	e.POST("/quiz-extra", quizExtra)

	log.Println("Iniciando servidor na porta 8000...")

	if err := e.Start(":8000"); err != nil {
		log.Fatal(err)
	}
}
