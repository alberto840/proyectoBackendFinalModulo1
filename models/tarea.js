const mongoose = require('mongoose');
const TareaSchema = new mongoose.Schema({
    usuarioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    fecha_limite: {
        type: Date,
        required: true,
        default: Date.now
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'completada', 'en_progreso'],
        required: true,
        default: 'pendiente'
    },
    titulo: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Tarea', TareaSchema);