import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header/Header";
import Generos from "./components/Gerneros/Generos";
import NovoGenero from "./components/NovoGenero/NovoGenero";
import EditarGenero from "./components/EditarGenero/EditarGenero";

const Home = () => {
  return <h1>Home</h1>;
};

const App = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("/api").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Router>
      <div>
        <Header />
        <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/generos" exact component={Generos} />
        <Route path="/generos/novo/" exact component={NovoGenero} />
        <Route path="/generos/:id" exact component={EditarGenero} />
        </Switch>
        <pre>{JSON.stringify(data)}</pre>
      </div>
    </Router>
  );
};

export default App;
