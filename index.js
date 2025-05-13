const express = require('express');
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const app = express();
const authRoutes = require('./routes/auth');

dotenv.config();
connectDB();

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/tareas', require('./routes/tareas'));

const corsOptions = {
    origin: process.env.FRONTEND_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});