import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const URL = "http://localhost:4000/movies";
  const [movies, setMovies] = useState([]);
  const [edit, setEdit] = useState(false);
  const [movie, setMovie] = useState({
    id: 0,
    title: "",
    protagonist: "",
    category: "",
    url: "",
  });
  //API Methods
  const getMovies = async () => {
    const response = await axios.get(URL);
    setMovies(response.data);
  };

  const updateMovie = async (id) => {
    const findMovie = movies.findIndex((movie) => movie.id === id);
    setMovie(movies[findMovie]);
    setEdit(true);
  };

  const deleteMovie = async (id) => {
    await axios.delete(`${URL}/${id}`);
    const newMovies = movies.filter((movie) => movie.id !== id);
    setMovies(newMovies);
  };

  //Event Handlers
  const createMovie = async (e) => {
    e.preventDefault();
    if (!edit) {
      const response = await axios.post(URL, movie);
      setMovies([...movies, response.data]);
      setMovie({
        title: "",
        protagonist: "",
        category: "",
        url: "",
      });
    } else {
      const response = await axios.put(`${URL}/${movie.id}`, movie);
      const findMovie = movies.findIndex((item) => item.id === movie.id);
      movies[findMovie] = response.data;
      setMovies([...movies]);
      setEdit(false);
      setMovie({
        title: "",
        protagonist: "",
        category: "",
        url: "",
      });
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <form className="form">
        <h2>Crear pelicula</h2>
        <div className="container-input">
          <label>Titulo</label>
          <input
            name="title"
            value={movie.title}
            onChange={(e) => setMovie({ ...movie, title: e.target.value })}
          />
        </div>
        <div className="container-input">
          <label>Protagonista</label>
          <input
            name="protagonist"
            value={movie.protagonist}
            onChange={(e) =>
              setMovie({ ...movie, protagonist: e.target.value })
            }
          />
        </div>
        <div className="container-input">
          <label>Categoria</label>
          <input
            name="category"
            value={movie.category}
            onChange={(e) => setMovie({ ...movie, category: e.target.value })}
          />
        </div>
        <div className="container-input">
          <label>URL</label>
          <input
            name="url"
            value={movie.url}
            onChange={(e) => setMovie({ ...movie, url: e.target.value })}
          />
        </div>
        <button
          disabled={
            !(movie.title && movie.protagonist && movie.category && movie.url)
          }
          onClick={(e) => createMovie(e)}
          className="create-movie"
        >
          {edit ? "Editar película" : "Crear película"}
        </button>
      </form>
      <p className="title-movies">Lista de películas</p>
      <div className="movie-container">
        {movies.length === 0
          ? "No hay peliculas"
          : movies.map((movie) => (
              <div key={movie.id} className="movie">
                <p>
                  <span>Titulo:</span> {movie.title}
                </p>
                <p>
                  <span>Protagonista:</span> {movie.protagonist}
                </p>
                <p>
                  <span>Categoria:</span> {movie.category}
                </p>
                <p>
                  <span>URL:</span> {movie.url}
                </p>
                <div className="buttons">
                  <button
                    onClick={() => updateMovie(movie.id)}
                    className="edit"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deleteMovie(movie.id)}
                    className="delete"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default App;
