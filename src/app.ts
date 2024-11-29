import server from "express"
import { routerGenero, routerPlataforma, routerUsuario, routerVideojuego } from "./routes/indexRoutes"
import { AppDataSource } from "./data-source"
import cors from 'cors';
import api from "./api/api";

const app = server()
app.use(server.json())
app.use(cors());

app.use(api)

app.listen(3000, () => {
    console.log('Server on port 3000')
})

async function inicializarBD(){
    await AppDataSource.initialize()
    console.log("Base de datos inicializada.")
}

inicializarBD()
