import { useState } from "react";
import backgroundVideo from "./videos/Video1.mp4";
import backgroundImage from "./images/BgImg.jpg";

export default function App() {
  const [loginPageState, setLoginPageState] = useState(false);
  const handleClick = () => {
    setLoginPageState(!loginPageState);
  };
  return loginPageState ? (
    <>
      <div className="container">
        <div className="content2">
          <h1>DIGISLAM</h1>
          <img src={backgroundImage} alt="bgimg" />
          <div>
            <input
              className="inputEmail"
              type="email"
              placeholder="PLEASE ENTER YOUR EMAIL . . . ."
            />
            <button className="checkButton">Proceed</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="container">
        <video loop muted playsInline autoPlay className="back-video">
          <source src={backgroundVideo} type="video/mp4"></source>
        </video>
        <div className="content">
          <h1>DIGISLAM</h1>
          <br />
          <br />
          <h2>
            RELIVE <span className="span-class">YOUR MEMORIES,</span> <br /> A
            DIFFERENT WAY
          </h2>
          <button onClick={handleClick}>CREATE YOUR SLAM BOOK</button>
        </div>
      </div>
    </>
  );
}
