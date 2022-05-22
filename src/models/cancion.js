const mongoose = require("mongoose");

//Se define el esquema de la base de datos 
const cancionSchema = new mongoose.Schema(
    {
        //_id: mongoose.Schema.Types.ObjectId,
        cancion: String,
        artista: String,
        album: String,
        año: Number,
        pais: String,
        //cancionId: String,
    },
    {
        collection : "Canciones",versionKey: false //para forzar a enlazar con una colección
    }

);

module.exports = mongoose.model('Cancion', cancionSchema);