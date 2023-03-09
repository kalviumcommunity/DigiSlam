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
  const [signInDisabled, setSignInDisabled] = useState(true);
  // const [inputValue, setInputValue] = useState({
  //   Email: "",
  //   Password: "",
  //   Confirm_Password: ""
  // });
  const Regex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
  const handleClick = () => {
    setState(!state);
  };
  const handleChange = () => {
    var Email = document.getElementById("signUpEmail").value;
    var password = document.getElementById("signUpPassword").value;
    var Confirm_password = document.getElementById("signUpConfirmPassword").value;
    if(Regex.test(Email) && password===Confirm_password){
      setSignInDisabled(false)
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
      <div className="loginContainer">
        <h1 className="projectTitle projectTitleInAllPages">DiGiSLAM</h1>
        <div className="loginContentHolder">
          <h1>SIGN UP TO DIGISLAM</h1>
          <input
            id="signUpEmail"
            autoFocus
            placeholder="Email"
            type="email"
            onChange={handleChange}
          />
          <div>
            <input
              placeholder="Password"
              type={state ? "text" : "password"}
              maxLength="14"
              minLength="08"
              id="signUpPassword"
              onChange={handleChange}
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
            onChange={handleChange}
          />
          <Link to="/nick_name">
            <button disabled={signInDisabled}>SIGN UP</button>
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
