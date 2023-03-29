import React, { useState, useEffect } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import YourSlams from "./YourSlams";
import YourBook from "./YourBook";
import Templates from "./Templates";
import Loader from "../loader/Loader";
import { useLogout } from "../components/hooks/useLogout";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

const MainPage = () => {
  const { user } = useAuthContext();
  const [activeComponent, setActiveComponent] = useState(<YourSlams />);
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

  const handleClick = (e) => {
    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].hasAttribute("id", "active")) {
        buttons[i].removeAttribute("id", "active");
      }
    }
    e.target.setAttribute("id", "active");
    if (e.target.classList[1] === "2") {
      setActiveComponent(<YourBook />);
    } else if (e.target.classList[1] === "3") {
      setActiveComponent(<Templates />);
    } else if (e.target.classList[1] === "1") {
      setActiveComponent(<YourSlams />);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
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
      {user ? (
        <>
          <div className="mainPageContainer">
            <h1 className="projectTitle projectTitleInAllPages">DiGiSLAM</h1>
            <div className="usernameHolder">
              {user && (
                <h1 className="projectTitle Username">
                  Hey {user && user.user.username}
                </h1>
              )}
              {user && <button onClick={logout}>LOG OUT</button>}
            </div>
          </div>
          <div className="navBar">
            <button onClick={handleClick} id="active" className="button 1">
              Your Slams
            </button>
            <button onClick={handleClick} className="button 2">
              Your Book
            </button>
          </div>
          <div className="componentHolder">{activeComponent}</div>
        </>
      ) : (
        <div className="loggedOut not-found">
          <h2 className="projectTitle">DiGiSLAM</h2>
          <p>You are logged out, Redirecting...</p>
        </div>
      )}
    </>
  );
};

export default MainPage;
