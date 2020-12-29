import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Badge, Button, Container } from "reactstrap";

const InfoSerie = ({ match }) => {
  const [form, setForm] = useState({
   
  });
  const [success, setSuccess] = useState(false);
  const [mode, setMode] = useState("INFO");
  const [genres, setGenres] = useState("");
  const [genreId, setGenreId] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("/api/series/" + match.params.id).then((res) => {
      setData(res.data);
      setForm(res.data);
    });
  }, [match.params.id]);

  useEffect(() => {
    axios.get("/api/genres").then((res) => {
      setGenres(res.data.data);
      const genres = res.data.data;
      const encontrado = genres.find((value) => data.genre === value.name);
      if (encontrado) setGenreId(encontrado.id);
    });
  }, [data]);

  //custom header

  const masterHeader = {
    heigth: "50vh",
    minHiegth: "500px",
    backgroundImage: `url('${data.background}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const hadleChangeGenre = (event) => {
    setGenreId(event.target.value);
  };

  const hadleChange = (field) => (event) => {
    setForm({
      ...form,
      [field]: event.target.value,
    });
  };

  const seleciona = (value) => () => {
    setForm({
      ...form,
      status: value,
    });
  };

  const save = () => {
    axios
      .put("/api/series/" + match.params.id, {
        ...form,
        genre_id: genreId,
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
              </div>div
              <div className="col-8">
                <h1 className="font-weight-light text-white">{data.name}</h1>
                <div className="lead text-white">
                  {data.status === "ASSISTIDO" && (
                    <Badge color="success">Assistido</Badge>
                  )}
                  {data.status === "PARA_ASSISTIR" && (
                    <Badge color="warning">Para assistir</Badge>
                  )}
                  Gênero:{data.genre}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Container>
        <Button color="primary"  onClick={() => setMode("EDIT")}>
          Editar
        </Button>
      </Container>
      {mode === "EDIT" && (
        <div className="container">
          <h1>Editar Série</h1>
          <Button color="warning" onClick={() => setMode("INFO")}>
            Cancelar Edição
          </Button>

          <form>
            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                value={form.name}
                onChange={hadleChange("name")}
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
                onChange={hadleChange("comments")}
                className="form-control"
                id="name"
                placeholder="comentários"
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Gênero</label>
              <select
                className="form-control"
                onChange={hadleChangeGenre}
                value={genreId}
              >
                {genres.map((genre) => (
                  <option
                    key={genre.id}
                    value={genre.id}
                    selected={genre.id === form.genre}
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="status"
                id="assitido"
                value="ASSISTIDO"
                checked={form.status === "ASSISTIDO"}
                onChange={seleciona("ASSISTIDO")}
              />
              <label htmlFor="assitido" className="form-check-label">
                Assistido
              </label>
            </div>

            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="status"
                id="paraAssistir"
                value="PARA_ASSISTIR"
                checked={form.status === "PARA_ASSISTIR"}
                onChange={seleciona("PARA_ASSISTIR")}
              />
              <label htmlFor="paraAssistir" className="form-check-label">
                Para assistir
              </label>
            </div>

            <Button onClick={save} type="button" color="primary">
              Salvar
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default InfoSerie;
