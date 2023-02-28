import React, { useState, useEffect } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import showPasswordIcon from "./assets/showPasswordIcon.png";
import hidePassWordIcon from "./assets/action-hide-passwordIcon.png";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const SignUpPage = () => {
  const [state, setState] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = () => {
    setState(!state);
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
      <div className="loginContainer">
        <h1 className="projectTitle projectTitleInAllPages">DiGiSLAM</h1>
        <div className="loginContentHolder">
          <h1>Sign Up To DiGiSLAM</h1>
          <input
            id="signUpEmail"
            autoFocus
            placeholder="Email"
            type="email"
            required
          />
          <div>
            <input
              placeholder="Password"
              type={state ? "text" : "password"}
              maxLength="14"
              minLength="08"
              id="signUpPassword"
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
          <input
            placeholder="Confirm-Password"
            type={state ? "text" : "password"}
            maxLength="20"
            minLength="08"
            id="signUpConfirmPassword"
            required
          />
          <Link to="/nick_name">
            <button disabled={false}>SIGN UP</button>
          </Link>
          <p>
            Already a slammer?{" "}
            <Link to="/login">
              <span>Log in</span>
            </Link>{" "}
            here.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignUpPage;
