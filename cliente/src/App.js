import React, { useState, Fragment } from "react";
import Chat from "./componentes/Chat";
import "./App.css";
import ListRegistry from './componentes/ListRegistry';

function App() {
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  };

  return (
    <Fragment>
      <div>
        <ListRegistry />
      </div>
      <div className="App">
        {!registrado && (
          <form onSubmit={registrar}>
            <label htmlFor="">Introduzca su nombre</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <button>Ir al chat</button>
          </form>
        )}

        {registrado && <Chat nombre={nombre} />}
      </div>
    </Fragment>
    
  );
}

export default App;
