const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, usuario.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      },
      process.env.JWT_SECRET || 'fallbackSecret',
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

module.exports = { login };