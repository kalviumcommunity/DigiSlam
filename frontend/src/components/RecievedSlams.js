import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "./hooks/useAuthContext";

const RecievedSlams = () => {
  const { user } = useAuthContext();
  const [slam, setSlam] = useState([]);
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + user.user._id)
      .then((res) => {
        res.data.received.forEach((item) => {
          getSlam(item.shared_id, item.slam_id);
        });
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [user.user._id]);

  const getSlam = async (id, slam) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}${id}`)
      .then((res) => {
        setSlam(
          res.data.slams.filter((el) => {
            return el.unique_id === slam;
          })
        );
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return (
    <div style={{ color: "white", marginTop: "10vh" }}>
      {slam.length === 0 ? (
        <h1 style={{ textAlign: "center", marginTop: "40vh" }}>
          No slams received
        </h1>
      ) : (
        slam.map((item) => {
          return (
            <div>
              <h1>{item.name}</h1>
              <button
                style={{
                  width: "15vw",
                  height: "5vh",
                  backgroundColor: "lightblue",
                }}
                onClick={() =>
                  window.open(
                    `/basic_out/${item.sid}/${item.unique_id}`,
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
