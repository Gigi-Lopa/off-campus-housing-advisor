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
   let token = Cookie.get("hot_token");
    if (token) {
      try {
        const parsed = JSON.parse(token);
        if (parsed._id) {
          navigate(`/host/${parsed._id}`);
        } else {
          _set_render(true);
        }
      } catch (err) {
        console.error("Invalid token format:", err);
        _set_render(true);
      }
    } else {
      _set_render(true);
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
