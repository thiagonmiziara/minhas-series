import React from "react";
import {Container} from "reactstrap";
import Footer from "../Footer/Footer";
const Home = () => {
  return (<Container className="text-center">
    <h1>Minhas Séries</h1>
    <img src="./series1.jpg" alt="Séries" className="img-fluid"/>
    <Footer/>
  </Container>);
};

export default Home;
