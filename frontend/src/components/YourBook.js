import React from "react";
import profileImage from "./assets/profile_pic.jpg";

const YourBook = () => {
  return (
    <>
      <button className="sendToFriendsButton">Send to your friends 🤘</button>
      <div className="gridContainer">
        <div className="grid-book-element">
          <div className="ImageHolder">
            <img src={profileImage} height={80} alt="displayImage" />
            <h1>Spoidy</h1>
          </div>
        </div>
        <div className="grid-book-element">
          <div className="ImageHolder">
            <img src={profileImage} height={80} alt="displayImage" />
            <h1>Teddy</h1>
          </div>
        </div>
        <div className="grid-book-element">
          <div className="ImageHolder">
            <img src={profileImage} height={80} alt="displayImage" />
            <h1>Prad</h1>
          </div>
        </div>
        <div className="grid-book-element">
          <div className="ImageHolder">
            <img src={profileImage} height={80} alt="displayImage" />
            <h1>Golu</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourBook;
