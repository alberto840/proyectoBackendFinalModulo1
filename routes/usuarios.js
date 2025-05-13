const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
// Rutas para Usuarios
router.post('/', usuariosController.crearUsuario);
router.get('/', usuariosController.obtenerUsuarios);
router.get('/:id', usuariosController.obtenerUsuarioPorId);
router.put('/:id', usuariosController.actualizarUsuario);
router.delete('/:id', usuariosController.eliminarUsuario);
module.exports = router;
