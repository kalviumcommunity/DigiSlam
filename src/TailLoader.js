import React from "react";
import { TailSpin } from "react-loader-spinner";
import landingPageBackground from "./components/assets/loaderBG.png"

const TailLoader = () => {
  return (
    <div className="tailLoader">
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <TailSpin
        height="150"
        width="150"
        color="#d0ff00"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default TailLoader;
