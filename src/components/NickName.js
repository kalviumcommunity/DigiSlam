import React, { useState } from "react";
import { Link } from "react-router-dom";
import landingPageBackground from "./assets/LoginBG.jpg";

const NickName = () => {
  const [disabledButtonState, setDisabledButtonState] = useState(true);
  const [nickNameValue, setNickNameValue] = useState("");

  const handleChange = (e) => {
    setNickNameValue(e.target.value)
    if(e.target.value !== "" && !e.target.value.includes(" ")){
      setDisabledButtonState(false)
    }
    else if(e.target.value === "" || e.target.value.includes(" ")){
      setDisabledButtonState(true)
    }
 }

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
          <h1>Almost There</h1>
          <input
            placeholder="Your Nick Name"
            type="text"
            value={nickNameValue}
            onChange={handleChange}
            required
          />
          <Link to="/main">
            <button disabled={disabledButtonState} onClick={sessionStorage.setItem("Nick Name", nickNameValue)}>Continue</button>
          </Link>
          <p>
            <span>Remember!</span> <br/>
            Your <span>friends</span> will know you by this name.
          </p>
        </div>
      </div>
    </>
  );
};

export default NickName;
