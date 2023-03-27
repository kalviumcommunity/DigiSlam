import React from "react";

const Cover = (props) => {
  const details = props.data;
  console.log(details);
  return (
    <div className="grid-book-element">
      <div className="ImageHolder">
        <img src="#" height={80} alt="displayImage" />
        <h2>{details.slam.name}</h2>
      </div>
    </div>
  );
};

export default Cover;
