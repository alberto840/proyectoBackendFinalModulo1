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
        enum: ['pendiente', 'completada'],
        default: 'pendiente'
    },
    titulo: {
        type: String,
        required: true
    },
});
module.exports = mongoose.model('Tarea', TareaSchema);