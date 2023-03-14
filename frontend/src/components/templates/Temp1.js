import React from "react";
import "./template1.css";
import HolderImage from "../assets/choose-image.png";

const Temp1 = () => {
  const handleImageInput = () => {
    document.getElementById("activeImage").click();
  };
  return (
    <>
      <div className="TemplateHolder">
        <div className="row-1">
          <div className="personalQuestions">
            <input type="text" placeholder="Your Name" />
            <input type="text" placeholder="What Your Friends Call You" />
          </div>
          <div className="imageinputBox" onClick={handleImageInput}>
            <input
              className="inputImage"
              type="file"
              id="activeImage"
              accept="image/*"
              placeholder="Choose an image"
            />
            <img src={HolderImage} height={120} alt="HolderImage" />
            <h3>Your Awesome Image</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Temp1;
