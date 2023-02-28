import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import landingPageBackground from "./assets/LoginBG.jpg";
import Footer from "./Footer";

const NickName = () => {
  const [disabledButtonState, setDisabledButtonState] = useState(true);
  const [nickNameValue, setNickNameValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (e) => {
    setNickNameValue(e.target.value);
    if (e.target.value !== "" && !e.target.value.includes(" ")) {
      setDisabledButtonState(false);
    } else if (e.target.value === "" || e.target.value.includes(" ")) {
      setDisabledButtonState(true);
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
          <h1>Almost There</h1>
          <input
            placeholder="Your Nick Name"
            type="text"
            value={nickNameValue}
            onChange={handleChange}
            required
          />
          <Link to="/main">
            <button
              disabled={disabledButtonState}
              onClick={sessionStorage.setItem("Nick Name", nickNameValue)}
            >
              Continue
            </button>
          </Link>
          <p>Please choose a small name without any spaces.</p>
          <p>
            <span>Remember!</span> <br />
            Your <span>friends</span> will know you by this name.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NickName;
