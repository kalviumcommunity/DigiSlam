import React, { useState } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import showPasswordIcon from "./assets/showPasswordIcon.png";
import hidePassWordIcon from "./assets/action-hide-passwordIcon.png";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const LoginPage = () => {
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(!state);
  };

  return (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <div className="loginContainer">
        <h1 className="projectTitle projectTitleInAllPages">DiGiSLAM</h1>
        <div className="loginContentHolder">
          <h1>Log in to DiGiSLAM</h1>
          <input placeholder="Email" type="email" required />
          <div>
            <input
              placeholder="Password"
              type={state ? "text" : "password"}
              maxLength="20"
              minLength="08"
              required
            />
            <img
              className="showPassword"
              src={state ? hidePassWordIcon : showPasswordIcon}
              height={20}
              width={20}
              onClick={handleClick}
              alt="showPassword"
            />
          </div>
          <Link to="/main">
            <button disabled={true}>LOG IN</button>
          </Link>
          <p>
            Not a slammer?{" "}
            <Link to="/sign_up">
              <span>Sign Up</span>
            </Link>{" "}
            here.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
