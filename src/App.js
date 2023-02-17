import React from "react";
import "./App.css";
import mainbg from "./assets/Mainbg.jpg";
import suppbg1 from "./assets/suppbg1.jpg";
import suppbg2 from "./assets/suppbg2.jpg";
import {Routes, Route, link} from 'react-router-dom';

function App() {
  return (
    <>
      <div className="container">
        <div className="content">
          <img className="bgimg" src={mainbg} alt="mainbg" />
          <div className="supportImages">
            <img
              className="supportImage1"
              src={suppbg1}
              height={300}
              alt="suppbg1"
            />
            <img
              className="supportImage2"
              src={suppbg2}
              height={300}
              alt="suppbg2"
            />
          </div>
          <div className="contentHolder">
            <h1 id="title">DIGISLAM</h1>
            <link to="/"></link><button>CREATE YOUR OWN SLAM</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
