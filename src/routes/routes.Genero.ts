import { Router } from 'express';
import { AppDataSource } from "../data-source";
import { Genero } from '../entity/Genero';

const routerGenero = Router();

// GET: Listar todos los géneros
routerGenero.get('/', async (req, res) => {
    try {
        const repositorios = AppDataSource.getRepository(Genero);
        const generos = await repositorios.find();
        res.json(generos);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar géneros', error });
    }
});

// GET: Obtener un género por ID
routerGenero.get('/:id', async (req, res) => {
    const { id } = req.params;
    const repositorios = AppDataSource.getRepository(Genero);
    
    try {
        const genero = await repositorios.findOne({ where: { id: parseInt(id) } });
        
        if (genero) {
            res.json(genero);
        } else {
            res.status(404).json({ message: 'Género no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el género', error });
    }
});

// POST: Crear un nuevo género
routerGenero.post('/', async (req, res) => {
    const { nombre } = req.body;
    const genero = new Genero();
    genero.nombre = nombre;
    
    try {
        await AppDataSource.getRepository(Genero).save(genero);
        res.status(201).json(genero);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el género', error });
    }
});

// PATCH: Actualizar un género
routerGenero.patch('/', async (req, res) => {
    const { id, nombre } = req.body;
    const repositorios = AppDataSource.getRepository(Genero);

    try {
        const result = await repositorios.update(id, { nombre });

        if (result.affected === 0) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }
        const updatedGenero = await repositorios.findOne({ where: { id } });
        res.status(200).json(updatedGenero);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el género', error: error.message });
    }
});

// DELETE: Eliminar un género
routerGenero.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const repositorios = AppDataSource.getRepository(Genero);
    
    try {
        const result = await repositorios.delete({ id: parseInt(id) });
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Género no encontrado' });
        }
        return res.status(200).json({ message: "Género eliminado" });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el género', error: error.message });
    }
});

export default routerGenero;
