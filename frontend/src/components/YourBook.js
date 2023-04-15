import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";
import axios from "axios";
import { MagnifyingGlass } from "react-loader-spinner";
import { useAuthContext } from "./hooks/useAuthContext";
import noData from "./assets/noSlams.svg";

const YourBook = () => {
  const { user } = useAuthContext();
  const [slams, setSlams] = useState([]);
  const [fetching, setFetching] = useState(true);
  const handleClick = () => {
    navigator.clipboard.writeText(
      process.env.REACT_APP_COPY_URL + user.user._id
    );
    toast.success("Copied");
  };

  useEffect(() => {
    if (user) {
      axios
        .get(process.env.REACT_APP_API_URL + user.user._id)
        .then((res) => {
          if (res) {
            setTimeout(() => {
              setFetching(false);
            }, 1500);
            setSlams(res.data.slams);
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }, [user]);
  return (
    <>
      <ToastContainer autoClose="2000" />
      {fetching ? (
        <div
          className="loader-holder"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <MagnifyingGlass
            visible={true}
            height="100"
            width="100"
            ariaLabel="MagnifyingGlass-loading"
            wrapperStyle={{}}
            wrapperClass="MagnifyingGlass-wrapper"
            glassColor="#c0efff"
            color="yellow"
          />
        </div>
      ) : slams.length === 0 ? (
        <div className="no-slam-data">
          <img src={noData} height={200} alt="noData" />
          <h1>SEND YOUR FIRST SLAM</h1>
          <button onClick={handleClick}>SEND +</button>
        </div>
      ) : (
        <div className="slam-container">
          {slams.map((slam) => {
            return <Card data={{ slam }} />;
          })}
        </div>
      )}
    </>
  );
};

export default YourBook;
