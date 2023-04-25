import React, { useState, useEffect } from "react";
import landingPageBackground from "./assets/LoginBG.jpg";
import YourBook from "./YourBook";
import YourSlams from "./YourSlams";
import SharedSlams from "./SharedSlams";
import RecievedSlams from "./RecievedSlams";
import Loader from "./loader/Loader";
import { useLogout } from "../components/hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import { ToastContainer, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import { RxHamburgerMenu } from "react-icons/rx";
import axios from "axios";

const Main = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const [isLoading, setIsLoading] = useState(true);
  const [component, setComponent] = useState(<YourBook />);
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      const interval = setInterval(() => {
        setTimer((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [user]);
  useEffect(() => {
    if (timer === 0) {
      navigate("/login", { replace: true });
    }
  }, [timer, navigate]);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  function handleClick() {
    toast.success("Copied!");
    navigator.clipboard.writeText(
      process.env.REACT_APP_COPY_URL + user.user._id
    );
  }

  const handleOptions = (e) => {
    const active = e.target.selectedIndex;
    if (active === 0) {
      setComponent(<YourBook />);
    } else if (active === 1) {
      setComponent(<YourSlams />);
    } else if (active === 2) {
      setComponent(<SharedSlams />);
    } else {
      setComponent(<RecievedSlams />);
    }
  };

  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL, {}).then((resp) => {
      console.log(
        resp.data.filter((item) => {
          return item.username === "Ayush Kumar";
        })
      );
    });
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
      {user ? (
        <>
          <div className="main-page-head">
            <h1 className="title">DiGiSLAM</h1>
            <RxHamburgerMenu
              className="hamburger"
              onClick={() =>
                document
                  .querySelector(".mobile-nav")
                  .classList.toggle("mobile-nav-active")
              }
            />
            <nav className="mobile-nav">
              <button onClick={logout}>LOG OUT</button>
              <button onClick={handleClick}>SEND +</button>
            </nav>
            <div className="user-login-details">
              <button className="main-page-button" onClick={logout}>
                LOG OUT
              </button>
              <button className="main-page-button" onClick={handleClick}>
                SEND +
              </button>
              <p>{user && `Hi ${user.user.username.split(" ")[0]} ✌`}</p>
            </div>
          </div>
          <div className="selection-holder">
            <select
              onChange={handleOptions}
              id="active-class"
              name="active"
              className="active-component"
            >
              <option>Your Book</option>
              <option>Your Slams</option>
              <option>Share Slams</option>
              <option>Recieved Slams</option>
            </select>
          </div>
          {component}
        </>
      ) : (
        <div className="logged-out">
          <h1>DiGiSLAM</h1>
          <p>You are logged out, Redirecting...</p>
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="yellow"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      )}
    </>
  );
};

const MainPage = () => {
  return (
    <>
      <Main />
      <ToastContainer autoClose="2000" />
    </>
  );
};

export default MainPage;
