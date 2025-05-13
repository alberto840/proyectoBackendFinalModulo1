const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
//const { auth } = require('../middlewares/auth');
//router.use(auth);
// Rutas para tareas
router.post('/', tareasController.crearTarea);
router.get('/', tareasController.obtenerTareas);
router.get('/:id', tareasController.obtenerTareaPorId);
router.put('/:id', tareasController.actualizarTarea);
router.delete('/:id', tareasController.eliminarTarea);
router.get('/estado/:estado', tareasController.obtenerTareasPorEstado);
module.exports = router;