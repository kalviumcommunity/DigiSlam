import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import SignUpPage from "./components/SignUpPage";
import NickName from "./components/NickName";
import Loader from "./Loader";
import Temp1 from "./components/templates/Temp1";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign_up" element={<SignUpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/nick_name" element={<NickName />} />
        <Route path="/load" element={<Loader/>}/>
        <Route path="/temp1" element={<Temp1/>}/>
      </Routes>
    </>
  );
}

export default App;
