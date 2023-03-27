import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cover from "./Cover";
import axios from "axios";
import { useAuthContext } from "./hooks/useAuthContext";

const YourBook = () => {
  const { user } = useAuthContext().user;
  const [slams, setSlams] = useState([]);

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

  const handleClick = () => {
    navigator.clipboard.writeText("http://localhost:3000/temp1");
    toast("Link Copied!", { className: "my-toast-body" });
    console.log(user);
  };
  return (
    <>
      <ToastContainer />
      <button className="sendToFriendsButton" onClick={handleClick}>
        COPY LINK!
      </button>
      {slams.length ? (
        <div className="gridContainer">
          {slams.map((slam) => {
            return <Cover data={{ slam }} />;
          })}
        </div>
      ) : (
        <h2>No Data Found</h2>
      )}
    </>
  );
};

export default YourBook;
