import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <form className="form">
        <div className="container-input">
          <label>Titulo</label>
          <input />
        </div>
        <div className="container-input">
          <label>Protagonista</label>
          <input />
        </div>
        <div className="container-input">
          <label>Categoria</label>
          <input />
        </div>
        <div className="container-input">
          <label>URL</label>
          <input />
        </div>
      </form>
      <button>Crear pelicula</button>
    </div>
  );
}

export default App;
