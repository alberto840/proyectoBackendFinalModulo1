const express = require('express');
const router = express.Router();
const tareasController = require('../controllers/tareasController');
const { authenticate } = require('../middleware/auth');
router.post('/', tareasController.crearTarea);
router.get('/', authenticate, tareasController.obtenerTareas);
router.get('/:id', authenticate, tareasController.obtenerTareaPorId);
router.get('/titulo/:titulo', authenticate, tareasController.obtenerTareasPorNombre);
router.post('/fechas', authenticate, tareasController.obtenerTareasEntreFechas);
router.put('/:id', authenticate, tareasController.actualizarTarea);
router.patch('/:id/iniciar', authenticate, tareasController.iniciarTarea);
router.patch('/:id/completar', authenticate, tareasController.completarTarea)
router.delete('/:id', authenticate, tareasController.eliminarTarea);
router.get('/estado/:estado', authenticate, tareasController.obtenerTareasPorEstado);
module.exports = router;