const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        
        if (!nombre || !email || !password) {
            return res.status(400).json({ 
                message: "Todos los campos son obligatorios: nombre, correo, password" 
            });
        }

        const usuarioExistente = await Usuario.findOne({ email });
        if (usuarioExistente) {
            return res.status(400).json({ 
                message: "El correo ya está registrado" 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const nuevoUsuario = new Usuario({
            nombre,
            email,
            password: passwordHash
        });

        const usuarioGuardado = await nuevoUsuario.save();

        const usuarioRespuesta = usuarioGuardado.toObject();
        delete usuarioRespuesta.password;

        res.status(201).json(usuarioRespuesta);

    } catch (error) {
        console.error('Error en crearUsuario:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ 
                message: Object.values(error.errors).map(val => val.message).join(', ')
            });
        }
        
        res.status(500).json({ 
            message: "Error al crear el usuario",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('-password');
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarUsuario = async (req, res) => {
    try {
        const usuarioActualizado = await Usuario.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).select('-password');

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.obtenerUsuarioPorEmail = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ email: req.params.email });
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};