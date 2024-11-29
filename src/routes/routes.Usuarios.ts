import { Router } from 'express';
import { AppDataSource } from "../data-source";
import { Usuario } from '../entity/Usuario';

const routerUsuario = Router();

// GET: Listar todos los usuarios
routerUsuario.get('/', async (req, res) => {
    try {
        const repositorios = AppDataSource.getRepository(Usuario);
        const usuarios = await repositorios.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: 'Error al listar usuarios', error });
    }
});

// GET: Obtener un usuario por ID
routerUsuario.get('/:id', async (req, res) => {
    const { id } = req.params;
    const repositorios = AppDataSource.getRepository(Usuario);
    
    try {
        const usuario = await repositorios.findOne({ where: { id: parseInt(id) } });
        
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
});

// POST: Crear un nuevo usuario
routerUsuario.post('/', async (req, res) => {
    const { nombreUsuario } = req.body;
    const usuario = new Usuario();
    usuario.nombreUsuario = nombreUsuario;
    
    try {
        await AppDataSource.getRepository(Usuario).save(usuario);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
});

// PATCH: Actualizar un usuario
routerUsuario.patch('/', async (req, res) => {
    const { id, nombreUsuario } = req.body;
    const repositorios = AppDataSource.getRepository(Usuario);

    try {
        const result = await repositorios.update(id, { nombreUsuario });

        if (result.affected === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        const updatedUsuario = await repositorios.findOne({ where: { id } });
        res.status(200).json(updatedUsuario);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: error.message });
    }
});

// DELETE: Eliminar un usuario
routerUsuario.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const repositorios = AppDataSource.getRepository(Usuario);
    
    try {
        const result = await repositorios.delete({ id: parseInt(id) });
        
        if (result.affected === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        return res.status(200).json({ message: "Usuario eliminado" });
        
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el usuario', error: error.message });
    }
});

export default routerUsuario;
