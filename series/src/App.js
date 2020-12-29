import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header/Header";
import Generos from "./components/Gerneros/Generos";
import NovoGenero from "./components/NovoGenero/NovoGenero";
import EditarGenero from "./components/EditarGenero/EditarGenero";
import Series from "./components/Series/Series";
import NovaSerie from "./components/NovaSerie/NovaSerie";
import InfoSerie from "./components/InfoSerie/InfoSerie";

const Home = () => {
  return <h1>Home</h1>;
};

const App = () => {
 
  return (
    <Router>
      <>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/generos" exact component={Generos} />
          <Route path="/generos/novo/" exact component={NovoGenero} />
          <Route path="/generos/:id" exact component={EditarGenero} />
          <Route path="/series/" exact component={Series} />
          <Route path="/series/novo/" exact component={NovaSerie} />
          <Route path="/series/:id" exact component={InfoSerie} />
        </Switch>
     </>
    </Router>
  );
};

export default App;
