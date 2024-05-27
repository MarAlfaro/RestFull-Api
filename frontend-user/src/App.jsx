import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const URL = "http://localhost:4000/movies";
  const [movies, setMovies] = useState([]);
  const getMovies = async () => {
    const response = await axios.get(URL);
    setMovies(response.data);
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
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
              </div>
            ))}
      </div>
    </>
  )
}

export default App
