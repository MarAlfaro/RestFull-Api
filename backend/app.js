const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const movies = [];

app.get("/movies", (req, res) => {
  res.json({ data: movies });
});

app.get("/movies/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === Number(req.params.id));
  if (!task) {
    res.status(404);
    return res.json({ error: "Pelicula no encontrada" });
  }

  res.json({ data: task });
});

app.post("/movies", (req, res) => {
  const newMovie = {};
  tasks.push(newMovie);
  res.status(201).json({ data: newMovie });
});

app.put("/movies/:id", (req, res) => {
  const movieIndex = movies.findIndex(
    (movie) => movie.id === Number(req.params.id)
  );

  if (movieIndex === -1) {
    res.status(404);
    return res.json({ error: "Pelicula no encontrada" });
  }

  tasks[movieIndex] = {
    ...tasks[movieIndex],
    ...req.body,
  };

  res.json({ data: movies[movieIndex] });
});

app.delete("/tasks/:id", (req, res) => {
  const movie = movies.find((movie) => movie.id === Number(req.params.id));

  if (!movie) {
    res.status(404);
    return res.json({ error: "Pelicula no encontrada" });
  }

  movies.splice(movie.indexOf(task), 1);

  res.json({ data: movie });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
