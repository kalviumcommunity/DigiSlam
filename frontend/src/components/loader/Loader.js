import React from "react";
import { Comment } from "react-loader-spinner";
import "./loader.css";
import landingPageBackground from "../../components/assets/LoginBG.jpg";
const Loader = () => {
  return (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <div className="loader">
        <Comment
          visible={true}
          height="80"
          width="80"
          ariaLabel="comment-loading"
          wrapperStyle={{}}
          wrapperClass="comment-wrapper"
          color="blue"
          backgroundColor="yellow"
        />
      </div>
    </>
  );
};

export default Loader;
