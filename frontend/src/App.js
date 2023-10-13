import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import MainPage from "./components/MainPage";
import Sign from "./components/Signup";
import Loader from "./components/loader/Loader";
import Login from "./components/LoginPage";
import NotFound from "./components/NotFound";
import BasicTemplate from "./components/templates/BasicTemplate";
import BasicOutput from "./components/output/BasicOutput";
import { useAuthContext } from "./components/hooks/useAuthContext";
import UpdateSlam from "./components/templates/UpdateSlam";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={!user ? <Landing /> : <Navigate to="/main" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<Sign />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/load" element={<Loader />} />
        <Route path="/basictemp/:id" element={<BasicTemplate />} />
        <Route path="/basic_out/:user_id/:id" element={<BasicOutput />} />
        <Route path="/update/:user_id/:id" element={<UpdateSlam />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
