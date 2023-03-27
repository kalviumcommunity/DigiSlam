import React, { useState, useEffect } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { useSignUp } from "./hooks/useSignUp";
import { ToastContainer } from "react-toastify";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading } = useSignUp();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    await signup(username, email, password);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <div className="loginContainer">
        <h1 className="projectTitle projectTitleInAllPages">DiGiSLAM</h1>
        <form className="loginContentHolder" onSubmit={handleSubmit}>
          <h1>SIGN UP TO DIGISLAM</h1>
          <input
            placeholder="Please Enter Your Name"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
          <input
            placeholder="Please Enter Your Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Choose A Strong Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <div className="showPassword">
            <input
              type="checkbox"
              onClick={() => setShowPassword(!showPassword)}
            />
            <label>Show Password</label>
          </div>
          <button disabled={loading}>SIGN UP</button>
          <p>
            Already a slammer?{" "}
            <Link to="/login">
              <span>Log in</span>
            </Link>{" "}
            here.
          </p>
        </form>
      </div>
    </>
  );
};

const Sign = () => {
  return (
    <>
      <SignUpPage />
      <ToastContainer autoClose="1000"/>
    </>
  );
};
export default Sign;
