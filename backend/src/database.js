const mongoose = require('mongoose');
const MONGO_DB_URI = process.env.MONGO_DB_URI;

// Función para conectar a MongoDB
const conectarMongo = async () => {
  try {
    await mongoose.connect(MONGO_DB_URI); // Conexión a MongoDB
    console.log('Mongo corriendo'); // Mensaje de éxito en la consola
  } catch (error) {
    console.error(error); // Mensaje de error en la consola
  }
};

module.exports = conectarMongo;
