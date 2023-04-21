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
        // console.log(res.data)
        setSlamsRec(res.data.received_slams);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [user.user._id]);
  return (
    <div style={{ color: "white", marginTop: "10vh" }}>
      {slamsRec.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "40vh" }}>
          No slams received
        </h1>
      ) : (
        slamsRec.map((item) => {
          return (
            <div>
              <h1>{item.name}</h1>
              <button
                onClick={() =>
                  window.open(
                    `/basic_out/${item.usersId}/${item.unique_id}`,
                    "_blank"
                  )
                }
              >
                Open
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default RecievedSlams;
