const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let peliculas = [];

//obtener todas las peliculas
app.get("/peliculas", (req, res) => {
  res.json(peliculas);
});

//crear una nueva pelicula
app.post("/peliculas", (req, res) => {
  const { titulo, protagonista, categoria, url } = req.body;

  if (!titulo || !protagonista || !categoria || !url) {
    return res.status(404).send("Todos los campos son obligatorios");
  } else {
    const nuevaPelicula = {
      id: peliculas.length + 1,
      titulo,
      protagonista,
      categoria,
      url,
    };
  }

  peliculas.push(nuevaPelicula);
  res.status(201).send(nuevaPelicula);
});

//ruta para obtener una pelicula en especifico
app.get("/peliculas/:id", (req, res) => {
  const peliculaId = parseInt(req.params.id);
  const pelicula = peliculas.find((p) => p.id === peliculaId);
  if (pelicula) {
    res.json(pelicula);
  } else {
    res.status(404).send("No se encontro la pelicula");
  }
});

//ruta para actualizar una pelicula
app.put("/peliculas/:id", (req, res) => {
  const indexPelicula = peliculas.findIndex(
    (pelicula) => pelicula.id === Number(req.params.id)
  );

  if (indexPelicula === -1) {
    res.status(404);
    return res.json({ error: "Pelicula no encontrada" });
  }

  peliculas[indexPelicula] = {
    ...peliculas[indexPelicula],
    ...req.body,
  };

  res.json(peliculas[indexPelicula]);
});

//Ruta para eliminar pelicula

app.delete("/tasks/:id", (req, res) => {
  const pelicula = peliculas.find(
    (pelicula) => pelicula.id === Number(req.params.id)
  );

  if (!pelicula) {
    res.status(404);
    return res.json({ error: "Pelicula no encontrada" });
  }

  peliculas.splice(peliculas.indexOf(pelicula), 1);

  res.json(pelicula);
});
