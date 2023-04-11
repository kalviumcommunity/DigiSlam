import React, { useState, useEffect } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import YourBook from "./YourBook";
import Loader from "./loader/Loader";
import { useLogout } from "../components/hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import { RxHamburgerMenu } from "react-icons/rx";

const Main = () => {
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useLogout();
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      const interval = setInterval(() => {
        setTimer((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [user]);
  useEffect(() => {
    if (timer === 0) {
      navigate("/login", { replace: true });
    }
  }, [timer, navigate]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  function handleClick() {
    toast.success("Copied!");
    navigator.clipboard.writeText(
      process.env.REACT_APP_COPY_URL + user.user._id
    );
  }
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      {user ? (
        <>
          <div className="main-page-head">
            <h1 className="title">DiGiSLAM</h1>
            <RxHamburgerMenu
              className="hamburger"
              onClick={() =>
                document
                  .querySelector(".mobile-nav")
                  .classList.toggle("mobile-nav-active")
              }
            />
            <nav className="mobile-nav">
              <button onClick={logout}>LOG OUT</button>
              <button onClick={handleClick}>SEND +</button>
            </nav>
            <div className="user-login-details">
              <button className="main-page-button" onClick={logout}>
                LOG OUT
              </button>
              <button className="main-page-button" onClick={handleClick}>
                SEND +
              </button>
              <p>{user && `Hi ${user.user.username.split(" ")[0]} ✌`}</p>
            </div>
          </div>
          <YourBook />
        </>
      ) : (
        <div className="logged-out">
          <h1>DiGiSLAM</h1>
          <p>You are logged out, Redirecting...</p>
        </div>
      )}
    </>
  );
};

const MainPage = () => {
  return (
    <>
      <Main />
      <ToastContainer autoClose="2000" />
    </>
  );
};

export default MainPage;
