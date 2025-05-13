const express = require('express');
require('dotenv').config(); // Añade esto para cargar variables de entorno
const app = express();
const connectDB = require('./config/db');

// Conectar a MongoDB Atlas
connectDB();

app.use(express.json());

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/tareas', require('./routes/tareas'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});