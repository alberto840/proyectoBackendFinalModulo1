const Tarea = require('../models/tarea');

exports.crearTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea({
      ...req.body,
      usuario: req.usuarioId
    });
    
    const tareaGuardada = await nuevaTarea.save();
    res.status(201).json(tareaGuardada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find({ usuario: req.usuarioId });
    
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerTareaPorId = async (req, res) => {
  try {
    const tarea = await Tarea.findOne({
      _id: req.params.id,
      usuario: req.usuarioId
    });
    
    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findOneAndUpdate(
      {
        _id: req.params.id,
        usuario: req.usuarioId
      },
      req.body,
      { new: true }
    );
    
    if (!tareaActualizada) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarTarea = async (req, res) => {
  try {
    const tareaEliminada = await Tarea.findOneAndDelete({
      _id: req.params.id,
      usuario: req.usuarioId
    });
    
    if (!tareaEliminada) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerTareasPorEstado = async (req, res) => {
  try {
    const tareas = await Tarea.find({
      usuario: req.usuarioId,
      estado: req.params.estado
    });
    
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};