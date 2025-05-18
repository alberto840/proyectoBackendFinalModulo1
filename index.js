const express = require('express');
const cors = require("cors");
require('dotenv').config();
const connectDB = require('./config/db');
const dotenv = require("dotenv");
const app = express();
const authRoutes = require('./routes/auth');

dotenv.config();
connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'https://proyecto-front-final-modulo1.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', ,'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/tareas', require('./routes/tareas'));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});