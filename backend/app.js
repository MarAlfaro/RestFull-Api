const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

let movies = [];

//obtener todas las peliculas
app.get('/movies', (req, res) => {
    res.json(movies);
})

//crear una nueva pelicula
app.post('/movies', (req, res) => {
    const {title, protagonist, category, url} = req.body;

    if (!title || !protagonist || !category || !url) {
        return res.status(404).send("Todos los campos son obligatorios");
    } else {
        const newMovie = {
            id: movies.length+1,
            title,
            protagonist,
            category,
            url
        }
    }

    movies.push(newMovie);
    res.status(201).send(newMovie);
    
})

//ruta para obtener una pelicula en especifico
app.get('/movies', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find(p => p.id === movieId);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).send("No se encontro la pelicula");
    }
});

//ruta para actualizar una pelicula
app.put("/movies/:id", (req, res) => {
  const movieid = parseInt(req.params.id);
  const movie = movies.find((t) => t.id === movieid);
  if (movie) {
    movie.title = req.body.title || movie.title;
    movie.protagonist = req.body.protagonist || movie.protagonist;
    movie.category = req.body.category || movie.category;
    movie.url = req.body.url || movie.url;
    res.json(movie);
  } else {
    res.status(404).send("No se actualizo la pelicula");
  }
});

//eliminar
app.delete("/movies/:id", (req, res) => {
  const movieid = parseInt(req.params.id);
  const moviein = movies.findIndex((t) => t.id === movieid);
  if (moviein !== -1) {
    movies.splice(moviein, 1);
    res.status(204).send("Se elimino correctamente");
  } else {
    res.status(404).send("No se elimino la pelicula");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en la url http://localhost:${port}`);
});
