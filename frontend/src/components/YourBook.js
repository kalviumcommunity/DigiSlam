import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Card from "./Card";
import axios from "axios";
import { useAuthContext } from "./hooks/useAuthContext";
import noData from "./assets/noSlams.svg";

const YourBook = () => {
  const { user } = useAuthContext().user;
  const [slams, setSlams] = useState([]);
  const handleClick = () => {
    navigator.clipboard.writeText(
      `http://localhost:3000/basictemp/${user._id}`
    );
    toast.success("Copied");
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8000/digislam/apis/users/${user._id}`)
        .then((res) => {
          setSlams(res.data.slams);
          console.log(res.data.slams);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [user]);
  return (
    <>
      <ToastContainer autoClose="2000" />
      {slams.length ? (
        <div className="gridContainer">
          {slams.map((slam) => {
            return <Card data={{ slam }} />;
          })}
        </div>
      ) : (
        <div className="no-slam-data">
          <img src={noData} height={200} alt="noData" />
          <h1>SEND YOUR FIRST SLAM</h1>
          <button onClick={handleClick}>SEND +</button>
        </div>
      )}
    </>
  );
};

export default YourBook;
