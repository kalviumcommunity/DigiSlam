import React, { useState, useEffect } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import YourSlams from "./YourSlams";
import YourBook from "./YourBook";
import Templates from "./Templates";
import Loader from "../loader/Loader";
import { useLogout } from "../components/hooks/useLogout";
import { Link } from "react-router-dom";

const MainPage = () => {
  const Username = JSON.parse(localStorage.getItem("user"));
  const [activeComponent, setActiveComponent] = useState(<YourSlams />);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useLogout();
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
      {Username ? (
        <>
          <div className="mainPageContainer">
            <h1 className="projectTitle projectTitleInAllPages">DiGiSLAM</h1>
            <div className="usernameHolder">
              {Username && (
                <h1 className="projectTitle Username">
                  Hey Ayush
                  {/* {Username && Username.user.username} */}
                </h1>
              )}
              {Username && <button onClick={logout}>LOG OUT</button>}
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
        <div className="loggedOut">
          <h1 className="projectTitle">DiGiSLAM</h1>
          <h3>You are logged out</h3>
          <Link to="/login">
            <button>NAVIGATE TO LOGIN PAGE</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default MainPage;
