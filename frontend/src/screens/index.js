import React from "react";
import "../styles/css/main.css"
import Nav from "../components/Nav";
import Listings from "../components/Listings";
import Footer from "../components/Footer";

function Index() {
  return (
    <div>
      <Nav/>
      <Listings/>
      <Footer/>
    </div>
  );
}

export default Index;
