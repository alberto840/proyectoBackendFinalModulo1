const Tarea = require('../models/tarea');

exports.crearTarea = async (req, res) => {
  try {
    const nuevaTarea = new Tarea({
      ...req.body,
      usuario: req.usuarioId,
      created_at: new Date()
    });

    const tareaGuardada = await nuevaTarea.save();
    res.status(201).json(tareaGuardada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find({ usuario: req.usuarioId }).sort({ created_at: -1 });;

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

exports.obtenerTareasPorNombre = async (req, res) => {
  try {
    if (!req.params.titulo || req.params.titulo.trim() === '') {
      return res.status(400).json({
        error: 'El parámetro de búsqueda (título) es requerido'
      });
    }

    const searchTerm = req.params.titulo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const tareas = await Tarea.find({
      usuario: req.usuarioId,
      titulo: {
        $regex: searchTerm,
        $options: 'i'
      }
    }).sort({ created_at: -1 });

    res.json(tareas);
  } catch (error) {
    console.error('Error al buscar tareas por nombre:', error);
    res.status(500).json({
      error: 'Error interno del servidor al buscar tareas',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

  exports.obtenerTareasEntreFechas = async (req, res) => {
    try {
      const { fechaInicio, fechaFin } = req.body;
      if (!fechaInicio || !fechaFin) {
        return res.status(400).json({
          error: 'Las fechas de inicio y fin son requeridas'
        });
      }
      const tareas = await Tarea.find({
        usuario: req.usuarioId,
        fecha_limite: {
          $gte: new Date(fechaInicio),
          $lte: new Date(fechaFin)
        }
      }).sort({ created_at: -1 });
      res.json(tareas);
    } catch (error) {
      console.error('Error al buscar tareas entre fechas:', error);
      res.status(500).json({
        error: 'Error interno del servidor al buscar tareas',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
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

exports.iniciarTarea = async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findOneAndUpdate(
      {
        _id: req.params.id,
        usuario: req.usuarioId,
        estado: 'pendiente'
      },
      {
        estado: 'en_progreso'
      },
      { new: true }
    );

    if (!tareaActualizada) {
      return res.status(404).json({
        message: 'Tarea no encontrada o no está en estado "pendiente"'
      });
    }

    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.completarTarea = async (req, res) => {
  try {
    const tareaActualizada = await Tarea.findOneAndUpdate(
      {
        _id: req.params.id,
        usuario: req.usuarioId,
        estado: 'en_progreso'
      },
      {
        estado: 'completada',
      },
      { new: true }
    );

    if (!tareaActualizada) {
      return res.status(404).json({
        message: 'Tarea no encontrada o no está en estado "en_progreso"'
      });
    }

    res.json(tareaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};