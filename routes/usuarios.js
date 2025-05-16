const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

const { authenticate } = require('../middleware/auth');
// Rutas para Usuarios
router.post('/', usuariosController.crearUsuario);
router.get('/', authenticate, usuariosController.obtenerUsuarios);
router.get('/:id', authenticate, usuariosController.obtenerUsuarioPorId);
router.put('/:id', authenticate, usuariosController.actualizarUsuario);
router.delete('/:id', authenticate, usuariosController.eliminarUsuario);
module.exports = router;
