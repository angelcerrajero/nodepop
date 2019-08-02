'use strict'

const mongoose = require('mongoose');
const conn = mongoose.connection;

//Gestionamos los eventos de la conexión

conn.on('error', err =>{
  console.log('Error de conexión', err);
  process.exit(1); //Aqui cerramos el proceso con un 1. Significa que cerramos el proceso con error. Si fuera satisfactorio seria un 0.
})

conn.once('open', () =>{
    console.log('Conectado a MongoDB en:', mongoose.connection.name);
});

//Conecto con MongoDB
mongoose.connect('mongodb://localhost/nodepop', { useNewUrlParser: true});


//Exporto la conexión por que la voy a usar en insertDB.js dentro de ./lib
module.exports = conn;