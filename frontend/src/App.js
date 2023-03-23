import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import SignUpPage from "./components/SignUpPage";
import Loader from "./loader/Loader";
import Temp1 from "./components/templates/Temp1";
import TempOutput1 from "./components/templates/TempOutput1";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign_up" element={<SignUpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/load" element={<Loader />} />
        <Route path="/temp1" element={<Temp1 />} />
        <Route path="/tempO1" element={<TempOutput1 />} />
      </Routes>
    </>
  );
}

export default App;
