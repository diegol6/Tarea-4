//npm init

//npm install express --save
const express = require("express");
//npm install mongoose
const mongoose = require("mongoose");
//npm install body-parser
const bodyParser = require("body-parser");
//se importa path para los directorios y concatenar
var path = require('path');
const { dirname } = require('path');
//se importa otra seccion de la pagina web
var canciones = require('./canciones');

const app = express();

//puerto de la app
app.listen(3000, () => console.log("Corriendo en el puerto 3000!"));

//x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/api',canciones);

app.use(function (res, res, next){
    next();
});

mongoose
    .connect(
        "mongodb+srv://diegolopez:mrfantastic@cluster0.1eeoh.mongodb.net/CancionesDB?retryWrites=true&w=majority"
    ).then(() => console.log('Conectado a Atlas'))
    .catch((error) => handleError(error));

    
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'public','inicio.html'));
});

app.get('/canciones', function(req,res){
    res.sendFile(path.join(__dirname, 'public','lista.html'));
});

app.use(function(req, res, next) {
    res.status(404).send('Esa pagina no existe!');
  });
/*

//Se define el esquema de la base de datos 
const cancionesSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        cancion: String,
        artista: String,
        album: String,
        año: Number,
        pais: String,
    },
    {
        collection : "musica", //para forzar a enlazar con una colección
    }

);

const Cancion = mongoose.model("Cancion", cancionesSchema);
*/


