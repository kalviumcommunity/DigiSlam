import React from "react";
import { Link } from "react-router-dom";
import landingPageBackground from "./assets/LoginBG.jpg";

const Landing = () => {
  return (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <div className="container-landing-page">
        <h1>DiGiSLAM</h1>
        <p>
          Re-live Your <span>Memories,</span>
          <br />A Different Way
        </p>
        <Link to="/sign_up">
          <button>Get Started</button>
        </Link>
      </div>
    </>
  );
};

export default Landing;
