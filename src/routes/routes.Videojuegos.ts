import { Router } from 'express';
import { AppDataSource } from "../data-source";
import { Videojuego } from '../entity/VideoJuegos';
import { Genero } from '../entity/Genero';
import { Plataforma } from '../entity/Plataforma';

const routerVideojuego = Router();





// GET: Listar todos los videojuegos
routerVideojuego.get('/', async (req, res) => {
    try {
        const repositorios = AppDataSource.getRepository(Videojuego);
        const videojuegos = await repositorios.find({ relations: ["genero", "plataforma"] });
        res.json(videojuegos);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar videojuegos', error });
    }
});

routerVideojuego.get('/prueba', async (req, res) => {
    return res.json.status(200).json({ message: 'conectado'})
});

// GET: Obtener un videojuego por ID
routerVideojuego.get('/:id', async (req, res) => {
    const { id } = req.params;
    const repositorios = AppDataSource.getRepository(Videojuego);
    
    try {
        const videojuego = await repositorios.findOne({ where: { id: parseInt(id) }, relations: ["genero", "plataforma"] });
        
        if (videojuego) {
            res.json(videojuego);
        } else {
            res.status(404).json({ message: 'Videojuego no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el videojuego', error });
    }
});

// POST: Crear un nuevo videojuego
routerVideojuego.post('/', async (req, res) => {
  const { titulo, precio, generoId, plataformaId } = req.body;

  const repositorioGenero = AppDataSource.getRepository(Genero);
  const repositorioPlataforma = AppDataSource.getRepository(Plataforma);
  
  try {
      // Buscar el género y la plataforma en la base de datos
      const genero = await repositorioGenero.findOneBy({ id: generoId });
      const plataforma = await repositorioPlataforma.findOneBy({ id: plataformaId });

      // Verificar si el género y la plataforma existen
      if (!genero) {
          return res.status(404).json({ message: 'Género no encontrado' });
      }
      if (!plataforma) {
          return res.status(404).json({ message: 'Plataforma no encontrada' });
      }

      const videojuego = new Videojuego();
      videojuego.titulo = titulo;
      videojuego.precio = precio;
      videojuego.genero = genero; // Asignar la entidad Genero
      videojuego.plataforma = plataforma; // Asignar la entidad Plataforma
      
      await AppDataSource.getRepository(Videojuego).save(videojuego);
      res.status(201).json(videojuego);
  } catch (error) {
      res.status(500).json({ message: 'Error al crear el videojuego', error });
  }
});


// PATCH: Actualizar un videojuego
routerVideojuego.patch('/', async (req, res) => {
    const { id, titulo, precio, generoId, plataformaId } = req.body;
    const repositorios = AppDataSource.getRepository(Videojuego);

    try {
        const result = await repositorios.update(id, { titulo, precio, genero: { id: generoId }, plataforma: { id: plataformaId } });

        if (result.affected === 0) {
            return res.status(404).json({ message: 'Videojuego no encontrado' });
        }
        const updatedVideojuego = await repositorios.findOne({ where: { id }, relations: ["genero", "plataforma"] });
        res.status(200).json(updatedVideojuego);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el videojuego', error: error.message });
    }
});

// DELETE: Eliminar un videojuego
routerVideojuego.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const repositorios = AppDataSource.getRepository(Videojuego);
    
    try {
        const result = await repositorios.delete({ id: parseInt(id) });
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Videojuego no encontrado' });
        }
        return res.status(200).json({ message: "Videojuego eliminado" });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el videojuego', error: error.message });
    }
});

export default routerVideojuego;
