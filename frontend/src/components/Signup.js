import React, { useState, useEffect } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import { Link } from "react-router-dom";
import Loader from "./loader/Loader";
import { useSignUp } from "./hooks/useSignUp";
import { ToastContainer } from "react-toastify";

const SignUp = () => {
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
      <h1 className="title">DiGiSLAM</h1>
      <form className="form" onSubmit={handleSubmit}>
        <h1 style={{fontSize: "36px"}}>CREATE ACCOUNT</h1>
        <div className="form-input-holder">
          <label>Name</label>
          <input
            placeholder="Name"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className="form-input-holder">
          <label>Email</label>
          <input
            placeholder="Email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-input-holder">
          <label>Password</label>
          <input
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <div className="show-password">
          <input
            type="checkbox"
            onClick={() => setShowPassword(!showPassword)}
          />
          <label>Show Password</label>
        </div>
        <button disabled={loading}>CREATE ACCOUNT</button>
        <p className="navigation-para">
          Have an account?{" "}
          <Link to="/login">
            <span> Log in</span>
          </Link>
        </p>
      </form>
    </>
  );
};

const Sign = () => {
  return (
    <>
      <SignUp />
      <ToastContainer autoClose="2000" />
    </>
  );
};
export default Sign;
