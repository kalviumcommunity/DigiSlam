import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./hooks/useAuthContext";

const RecievedSlams = () => {
  const { user } = useAuthContext();
  const [slamsRec, setSlamsRec] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + user.user._id)
      .then((res) => {
        setSlamsRec(res.data.received_slams);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [user.user._id]);
  return (
    <div style={{ color: "white", marginTop: "10vh" }}>
      {slamsRec.length === 0 ? (
        <h1>No slams received</h1>
      ) : (
        slamsRec.map((item) => {
          return <h1>{item.name}</h1>;
        })
      )}
    </div>
  );
};

export default RecievedSlams;
