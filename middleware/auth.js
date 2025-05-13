// middlewares/auth.js
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ['HS256']
    });

    const usuario = await Usuario.findById(decoded.id).select('-password');
    if (!usuario) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = usuario;
    next();
  } catch (error) {
    console.error('Error verificando token:', error.message);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }
    
    res.status(401).json({ 
      message: 'Token inválido',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};