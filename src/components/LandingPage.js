import React from "react";
import { Link } from "react-router-dom";
import landingPageBackground from "./assets/LoginBG.jpg";

const LandingPage = () => {
  return (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <div className="landingPageContentHolder">
        <h1 className="projectTitle">DiGiSLAM</h1>
        <p>
          Re-live Your <span>Memories,</span>
          <br />A Different Way
        </p>
        <Link to="/sign_up">
          <button className="navigateToLoginPageButton">Get Started</button>
        </Link>
      </div>
    </>
  );
};

export default LandingPage;
