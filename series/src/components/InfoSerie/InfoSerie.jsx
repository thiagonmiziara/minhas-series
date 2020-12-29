import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Badge, Button } from "reactstrap";

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({});
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("INFO");
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("/api/series/" + match.params.id)
      .then((res) => {
        setData(res.data);
        setForm(res.data);
      });
  }, [match.params.id]);

  //custom header

  const masterHeader = {
    heigth: "50vh",
    minHiegth: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const hadleChange = (field)=> (event) => {
    setForm({
      ...form,
      [field]: event.target.value
    });
  };

  const save = () => {
    axios
      .post("/api/series", {
        form,
      })
      .then((res) => {
        setSuccess(true);
      });
  };

  if (success) {
    return <Redirect to="/series" />;
  }

  return (
    <div>
      <header style={masterHeader}>
        <div className="h-100" style={{ background: "rgba(0,0,0,0.6)" }}>
          <div className="h-100 container">
            <div className="row h-100 align-items-center">
              <div className="col-3">
                <img
                  className="img-fluid img-thumbnail"
                  src={data.poster}
                  alt={data.name}
                />
              </div>
              <div className="col-8">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  <Badge color="success">Assistido</Badge>
                  <Badge color="warning">Para assistir</Badge>
                  Gênero:{data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <Button color='primary'onClick={()=> setMode('EDIT')}>Editar</Button>
      </div>
      {mode === "EDIT" && (
        <div className="container">
          <h1>Nova Série</h1>
        <Button color='warning' onClick={()=> setMode('INFO')}>Cancelar Edição</Button>

          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                value={form.name}
                onChange={hadleChange('name')}
                className="form-control"
                id="name"
                placeholder="Nome do Genêro"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Comentários</label>
              <input
                type="text"
                value={form.comments}
                onChange={hadleChange('comments')}
                className="form-control"
                id="name"
                placeholder="comentários"
              />
            </div>
            <button onClick={save} type="button" className="btn btn-primary">
              Salvar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
