import "reflect-metadata"
import { DataSource } from "typeorm"
import { Genero, Plataforma, Videojuego, Usuario } from "./entity/indexEntidades"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "sql10.freemysqlhosting.net",
    port: 3306,
    username: "sql10748388",
    password: "t1NGtek4vc",
    database: "sql10748388",
    synchronize: true,
    logging: false,
    entities: [Genero, Plataforma, Videojuego, Usuario],
    migrations: [],
    subscribers: [],
})
