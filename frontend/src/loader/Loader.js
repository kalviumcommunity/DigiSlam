import React from "react";
import { ProgressBar } from "react-loader-spinner";
import "../loader/loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <ProgressBar
        height="150"
        width="1000"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass="progress-bar-wrapper"
        borderColor="yellow"
        barColor="royalblue"
      />
    </div>
  );
};

export default Loader;
