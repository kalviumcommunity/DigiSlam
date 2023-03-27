import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import Sign from "./components/SignUpPage";
import Loader from "./loader/Loader";
import Temp1 from "./components/templates/Temp1";
import TempOutput1 from "./components/templates/TempOutput1";
import Login from "./components/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<Sign />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/load" element={<Loader />} />
        <Route path="/temp1" element={<Temp1 />} />
        <Route path="/tempO1" element={<TempOutput1 />} />
      </Routes>
    </>
  );
}

export default App;
