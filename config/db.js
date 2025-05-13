require('dotenv').config();
const uri = process.env.MONGO_URI;
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    
    const clientOptions = {
      serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
      }
    };

    await mongoose.connect(uri, clientOptions);
    console.log('✅ MongoDB Atlas conectado');
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB Atlas:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;