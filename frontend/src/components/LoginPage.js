import React, { useEffect, useState } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import { Link, useParams } from "react-router-dom";
import Loader from "./loader/Loader";
import { useLogin } from "./hooks/useLogin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const params = useParams();
  console.log(params);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return isLoading ? (
    <Loader />
  ) : (
    <>
      <img
        className="landingPageBgImg"
        src={landingPageBackground}
        alt="Landing_page_BG_Image"
      />
      <ToastContainer autoClose="2000" />
      <h1 className="title">DiGiSLAM</h1>
      <form className="form" onSubmit={handleSubmit}>
        <h1 style={{fontSize: "36px"}}>LOGIN</h1>
        <div className="form-input-holder">
          <label>Email</label>
          <input
            placeholder="Your Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="form-input-holder">
          <label>Password</label>
          <input
            placeholder="Your Password"
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
          <p>Show Password</p>
        </div>
        <button disabled={loading} onClick={() => toast.warn("Wait...")}>LOG IN</button>
        <p className="navigation-para">
          New to digislam?{" "}
          <Link to="/sign_up">
            <span>Sign up</span>
          </Link>{" "}
        </p>
      </form>
    </>
  );
};

const Login = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default Login;
