import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";
import SignUpPage from "./components/SignUpPage";
import NickName from "./components/NickName";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign_up" element={<SignUpPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/nick_name" element={<NickName/>} />
    </Routes>
  );
}

export default App;
