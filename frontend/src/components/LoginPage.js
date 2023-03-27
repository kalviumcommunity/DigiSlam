import React, { useEffect, useState } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import { useLogin } from "./hooks/useLogin";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
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
      {/* {Error !== "" && toast.error(Error)} */}
      <ToastContainer autoClose="1000" />
      <form className="loginContainer" onSubmit={handleSubmit}>
        <h1 className="projectTitle projectTitleInAllPages">DiGiSLAM</h1>
        <div className="loginContentHolder">
          <h1>LOG IN TO DIGISLAM</h1>
          <input
            placeholder="Please Enter Your Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Please Enter Your Password"
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
          <button disabled={loading}>LOG IN</button>
          <p>
            Not a slammer?{" "}
            <Link to="/sign_up">
              <span>Sign Up</span>
            </Link>{" "}
            here.
          </p>
        </div>
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
