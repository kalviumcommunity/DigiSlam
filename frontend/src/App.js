import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import Sign from "./components/SignUpPage";
import Loader from "./loader/Loader";
import TempOutput1 from "./components/templates/TempOutput1";
import Login from "./components/LoginPage";
import Template1 from "./components/templates/Temp1";
import NotFound from "./components/NotFound";
import { useAuthContext } from "./components/hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={user ? <MainPage /> : <Navigate to="/main" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/main" /> : <Login />}
        />
        <Route
          path="/sign_up"
          element={user ? <Navigate to="/main" /> : <Sign />}
        />
        <Route path="/main" element={<MainPage />} />
        <Route path="/load" element={<Loader />} />
        <Route path="/template1" element={<Template1 />} />
        <Route
          path="/templateOutput1"
          element={user ? <Navigate to="/main" /> : <TempOutput1 />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
