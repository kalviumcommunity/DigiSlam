import React, { useState, useEffect } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Loader from "./loader/Loader"

const NotFound = () => {
  const { user } = useAuthContext();
  const [timer, setTimer] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (timer === 0) {
      navigate(user ? "/main" : "/login", { replace: true });
    }
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <div className="not-found">
        <h1>404 - Page not found</h1>
        <p>
          Redirecting you to {user ? "main" : "login"} page in {timer}
        </p>
      </div>
    </>
  );
};

export default NotFound;
