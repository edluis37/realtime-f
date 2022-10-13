package main

import (
	"log"
	"rtf/luisamayateam/internal/apiserver"
	"rtf/luisamayateam/internal/store/sqlstore"
)

func main() {

	sqlO := &sqlstore.Options{
		Address: "./main.db",
	}

	st, err := sqlstore.Start(sqlO)

	if err != nil {
		log.Fatal(err)
	}
	defer st.Close()
	srv := apiserver.NewServer(st)
	if err := srv.Run(); err != nil {
		log.Fatal(err)
	}
}
