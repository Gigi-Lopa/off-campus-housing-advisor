import React, { useEffect, useState } from "react";
import "../styles/css/main.css"
import Nav from "../components/Nav";
import Listings from "../components/Listings";
import Footer from "../components/Footer";
import Cookie from "js-cookie"
import { useNavigate } from "react-router-dom";


function Index() {
  let navigate = useNavigate()
  let [render, _set_render] = useState(false)
  
  useEffect(()=>{
    let token = Cookie.get("hot_token")
    if(token){
      navigate(`/host/${token}`)
    } else{
      _set_render(true)
    }
  }, [])

  return (
      render ? (
        <div>
          <Nav/>
          <Listings/>
          <Footer/>
        </div>
      ) : (
        <div className="spinner">
        </div>
      )
  );
}

export default Index;
