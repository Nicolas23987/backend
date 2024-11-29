import routerGenero from "../routes/routes.Genero"
import routerPlataforma from "../routes/routes.Plataforma"
import routerUsuario from "../routes/routes.Usuarios"
import routerVideojuego from "../routes/routes.Videojuegos"
import server from "express"



const api = server()

api.use('/videojuegos', routerVideojuego)
api.use('/generos', routerGenero)
api.use('/plataforma', routerPlataforma)
api.use('/usuario', routerUsuario)

export default api