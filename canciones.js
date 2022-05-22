
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
//var path = require('path');
var express = require('express');
var router = express.Router(); 
//esto nos permite tener una aplicacion mas pequeña 

const cancionSchema = require('./src/models/cancion')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



router.use(function (req, res, next){
    console.log('Enrutamiento Exitoso');
    next();
});


//definicion de rutas


//recoger todas las canciones

router.get("/canciones/TravisScott", function (req, res) {
  //hace un query de los documentos
  cancionSchema.find({ artista: { $eq:"Travis Scott" } }, function (err, canciones) {
    if (err) {
      console.log(err);
      res.status(500).send("Error al leer de la BD x Travis");
    } else res.status(200).json(canciones);
  });
});

router.get("/canciones/Drake", function (req, res) {
  //hace un query de los documentos
  cancionSchema.find({ artista: { $eq:"Drake" } }, function (err, canciones) {
    if (err) {
      console.log(err);
      res.status(500).send("Error al leer de la BD x Drake");
    } else res.status(200).json(canciones);
  });
});

router.get("/canciones/PostMalone", function (req, res) {
  //hace un query de los documentos
  cancionSchema.find({ artista: { $eq:"Post Malone" } }, function (err, canciones) {
    if (err) {
      console.log(err);
      res.status(500).send("Error al leer de la BD x Travis");
    } else res.status(200).json(canciones);
  });
});

router.get("/canciones/Migos", function (req, res) {
  //hace un query de los documentos
  cancionSchema.find({ artista: { $eq:"Migos" } }, function (err, canciones) {
    if (err) {
      console.log(err);
      res.status(500).send("Error al leer de la BD x Travis");
    } else res.status(200).json(canciones);
  });
});

router.get("/canciones/KendricLamar", function (req, res) {
  //hace un query de los documentos
  cancionSchema.find({ artista: { $eq:"Kendric Lamar" } }, function (err, canciones) {
    if (err) {
      console.log(err);
      res.status(500).send("Error al leer de la BD x Travis");
    } else res.status(200).json(canciones);
  });
});

router.get("/canciones", (req,res) => {
    cancionSchema
        .find((err,canciones) => {
            if(err) res.status(500).send('Error en la BD1');
            else res.status(200).json(canciones);
        });
});



//recoger canciones que sean de ese año
router.get("/canciones/poranio", function (req, res) {
  cancionSchema.find({ año: {$eq: req.query.año}  }, function (err, canciones) {
    if (err) {
      console.log("error");
      res.status(500).send("Error entre el Año");
    } else res.status(200).json(canciones);
  });
});-


//recoger por nombre de artista
router.get("/canciones/porartista", function (req, res) {
    //hace un query de los documentos
    cancionSchema.find({ artista: { $eq: req.query.artista } }, function (err, canciones) {
      if (err) {
        console.log(err);
        res.status(500).send("Error al leer de la BD x Artista");
      } else res.status(200).json(canciones);
    });
  }); 


//buscan canciones entre años
router.get("/canciones/entreanios", function (req, res) {
  cancionSchema.find({ año: { $gte: req.query.año1, $lte: req.query.año2} }, function (err, canciones) {
    if (err) {
      console.log("error");
      res.status(500).send("Error entre los Años");
    } else res.status(200).json(canciones);
  });
});

//recoger información por ID
router.get("/canciones/:id", function (req, res) {
    //busca un registro por id
    cancionSchema.findById(req.params.id, function (err, canciones) {
      if (err) res.status(500).send("Error en la BD ID");
      else {
        if (canciones != null) {
          res.status(200).json(canciones);
        } else res.status(404).send("No se encontro la Cancion ID");
      }
    });
  });

 

router.post("/canciones", (req, res) => {
    //image.png crea un objeto pero del modelo Cancion
    const cancion1 = new cancionSchema({
      cancion: req.body.cancion,
      artista: req.body.artista,
      album: req.body.album,
      año: req.body.año,
      pais: req.body.pais,
    });
  
    //guarda una cancion en la base de datos
    cancion1.save(function (error, cancion1) {
      if (error) {
        res.status(500).send("No se ha podido agregar.");
      } else {
        res.status(200).json({cancion:cancion1.cancion}); //envía al cliente la cancion
      }
    });
  });


//edita canciones mediante IDs  
router.put("/canciones/:id", function (req, res) {
    //Modificar con Find ID
    cancionSchema.findById(req.params.id, function (err, cancion) {
      if (err) res.status(500).send("Error en la base de datos");
      else {
        if (cancion != null) {
          cancion.cancion = req.body.cancion;
          cancion.artista = req.body.artista;
          cancion.album = req.body.album;
          cancion.año = req.body.año;
          cancion.pais = req.body.pais;
  
          cancion.save(function (error, cancion1) {
            if (error) res.status(500).send("Error en la base de datos");
            else {
              res.status(200).send("Modificado exitosamente");
            }
          });
        } else res.status(404).send("No se encontro esa Cancion en la BD para PUT");
      }
    });
    });

//Borra canciones mediante ids
router.delete("/canciones/:id", function (req, res) {
    //Eliminar con Find ID
    cancionSchema.findById(req.params.id, function (err, canciones) {
      if (err) res.status(500).send("Error en la base de datos");
      else {
        if (canciones != null) {
          canciones.remove(function (error, result) {
            if (error) res.status(500).send("Error en la base de datos");
            else {
              res.status(200).send("Eliminado exitosamente");
            }
          });
        } else res.status(404).send("No se encontro esa Cancion para Delete");
      }
    });
    });

module.exports = router;
