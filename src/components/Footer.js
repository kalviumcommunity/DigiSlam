import React from "react";
import instagram from "./assets/instagram_logo.png";
import LinkedIN from "./assets/linkedIn_logo.png";
import Github from "./assets/github_logo.png";

const Footer = () => {
  return (
    <footer>
      <h3>Made with 💕 by Ayush.</h3>
      <div className="footerNavigation">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/Maverick_6041"
        >
          <img src={instagram} height={20} alt="instagramLogo" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.linkedin.com/in/ayush-kumar-346aa3248"
        >
          <img src={LinkedIN} height={20} alt="Linkedin_Logo" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.github.com/Ayush604141"
        >
          <img src={Github} height={20} alt="Github_Logo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
