import React, { useState, useEffect } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import YourSlams from "./YourSlams";
import YourBook from "./YourBook";
import Templates from "./Templates";
import Footer from "./Footer";
import TailLoader from "../TailLoader";

const MainPage = () => {
  const [activeComponent, setActiveComponent] = useState(<YourSlams />);
  const [isLoading, setIsLoading] = useState(true);
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
    }, 5000);
  }, []);
  const Username = sessionStorage.getItem("Nick Name");
  return isLoading ? (
    <TailLoader />
  ) : (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <div className="mainPageContainer">
        <h1 className="projectTitle projectTitleInAllPages">DiGiSLAM</h1>
        <div className="usernameHolder">
          <h1 className="projectTitle Username">
            Hey {Username.toLowerCase()}
          </h1>
          <button disabled>LOG OUT</button>
        </div>
      </div>
      <div className="navBar">
        <button onClick={handleClick} id="active" className="button 1">
          Your Slams
        </button>
        <button onClick={handleClick} className="button 2">
          Your Book
        </button>
        <button onClick={handleClick} className="button 3">
          Templates
        </button>
      </div>
      <div className="componentHolder">{activeComponent}</div>
      <Footer />
    </>
  );
};

export default MainPage;
