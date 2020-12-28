import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const NovoGenero = () => {
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);

  const hadleChange = (event) => {
    setName(event.target.value);
  };

  const save = () => {
    axios
      .post('/api/genres', {
        name
      })
      .then((res) => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/generos"/>;
  }

  return (
    <div className="container">
      <h1>Novo Genêro</h1>
      <form>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            value={name}
            onChange={hadleChange}
            className="form-control"
            id="name"
            placeholder="Nome do Genêro"
          />
        </div>
        <button onClick={save} type="button" className="btn btn-primary">
          Salvar
        </button>
      </form>
    </div>
  );
};

export default NovoGenero;
