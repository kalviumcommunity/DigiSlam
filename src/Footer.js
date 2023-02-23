import React from "react";
import instagram from "./components/assets/instagram_logo.png";
import LinkedIN from "./components/assets/linkedIn_logo.png";
import Github from "./components/assets/github_logo.png";

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
          href="https://www.linkedin.com/AyushKumar"
        >
          <img src={LinkedIN} height={20} alt="LinkedIN_Logo" />
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://www.github.com/Ayush604141"
        >
          <img src={Github} height={20} alt="GithubLogo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
