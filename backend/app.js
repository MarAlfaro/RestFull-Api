const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let peliculas = [];

//obtener todas las peliculas
app.get('/peliculas', (req, res) => {
    res.json(peliculas);
})

//crear una nueva pelicula
app.post('/peliculas', (req, res) => {
    const {titulo, protagonista, categoria, url} = req.body;

    if (!titulo || !protagonista || !categoria || !url) {
        return res.status(404).send("Todos los campos son obligatorios");
    } else {
        const nuevaPelicula = {
            id: peliculas.length+1,
            titulo,
            protagonista,
            categoria,
            url
        }
    }

    peliculas.push(nuevaPelicula);
    res.status(201).send(nuevaPelicula);
    
})

//ruta para obtener una pelicula en especifico
app.get('/peliculas', (req, res) => {
    const peliculaId = parseInt(req.params.id);
    const pelicula = peliculas.find(p => p.id === peliculaId);
    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).send("No se encontro la pelicula");
    }
});

//ruta para actualizar una pelicula
