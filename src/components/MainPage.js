import React from "react";
import landingPageBackground from "./assets/LoginBG.jpg";

const MainPage = () => {
  const handleClick = (e) => {
    let buttons = document.getElementsByClassName("button");
    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i].hasAttribute("id", "active")) {
        buttons[i].removeAttribute("id", "active");
      }
    }
    e.target.setAttribute("id", "active");
  };
  const Username = sessionStorage.getItem("Nick Name");
  return (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <div className="mainPageContainer">
        <h1 className="projectTitle projectTitleInAllPages">DiGiSLAM</h1>
        <div className="usernameHolder">
          <h1 className="projectTitle Username">Hey {Username.toLowerCase()}</h1>
          <button onClick={()=>{alert("Are you sure, you wanna logout?")}}>LOG OUT</button>
        </div>
      </div>
      <div className="navBar">
        <button onClick={handleClick} id="active" className="button">
          Your Slams
        </button>
        <button onClick={handleClick} className="button">
          Your Book
        </button>
        <button onClick={handleClick} className="button">
          Templates
        </button>
      </div>
    </>
  );
};

export default MainPage;
