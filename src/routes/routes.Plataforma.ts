import { Router } from 'express';
import { AppDataSource } from "../data-source";
import { Plataforma } from '../entity/Plataforma';

const routerPlataforma = Router();

// GET: Listar todas las plataformas
routerPlataforma.get('/', async (req, res) => {
    try {
        const repositorios = AppDataSource.getRepository(Plataforma);
        const plataformas = await repositorios.find();
        res.json(plataformas);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar plataformas', error });
    }
});

// GET: Obtener una plataforma por ID
routerPlataforma.get('/:id', async (req, res) => {
    const { id } = req.params;
    const repositorios = AppDataSource.getRepository(Plataforma);
    
    try {
        const plataforma = await repositorios.findOne({ where: { id: parseInt(id) } });
        
        if (plataforma) {
            res.json(plataforma);
        } else {
            res.status(404).json({ message: 'Plataforma no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la plataforma', error });
    }
});

// POST: Crear una nueva plataforma
routerPlataforma.post('/', async (req, res) => {
    const { nombre } = req.body;
    const plataforma = new Plataforma();
    plataforma.nombre = nombre;
    
    try {
        await AppDataSource.getRepository(Plataforma).save(plataforma);
        res.status(201).json(plataforma);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la plataforma', error });
    }
});

// PATCH: Actualizar una plataforma
routerPlataforma.patch('/', async (req, res) => {
    const { id, nombre } = req.body;
    const repositorios = AppDataSource.getRepository(Plataforma);

    try {
        const result = await repositorios.update(id, { nombre });

        if (result.affected === 0) {
            return res.status(404).json({ message: 'Plataforma no encontrada' });
        }
        const updatedPlataforma = await repositorios.findOne({ where: { id } });
        res.status(200).json(updatedPlataforma);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la plataforma', error: error.message });
    }
});

// DELETE: Eliminar una plataforma
routerPlataforma.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const repositorios = AppDataSource.getRepository(Plataforma);
    
    try {
        const result = await repositorios.delete({ id: parseInt(id) });
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Plataforma no encontrada' });
        }
        return res.status(200).json({ message: "Plataforma eliminada" });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la plataforma', error: error.message });
    }
});

export default routerPlataforma;
