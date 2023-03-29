import React from "react";
import { FidgetSpinner } from "react-loader-spinner";
import "../loader/loader.css";
import landingPageBackground from "../components/assets/LoginBG.jpg";
const Loader = () => {
  return (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <div className="loader">
        <FidgetSpinner
          visible={true}
          height="100"
          width="100"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
          ballColors={["#ff0000", "#00ff00", "#0000ff"]}
          backgroundColor="#F4442E"
        />
      </div>
    </>
  );
};

export default Loader;
