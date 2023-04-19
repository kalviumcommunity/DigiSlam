import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuthContext } from "./hooks/useAuthContext";

const SharedSlams = () => {
  const { user } = useAuthContext();
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResult] = useState([]);
  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSearchResult([]);
    } else {
      setSearchResult(
        users.filter((item) => {
          return item.username
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        })
      );
    }
  };

  const handleClick = async (e, slam, item) => {
    await axios
      .post(`${process.env.REACT_APP_API_URL}share/${item._id}`, slam)
      .then((res) => {
        if (res.status === 200) {
          toast.success(`Sent to ${item.username.split(" ")[0]}`);
        }
      })
      .catch((e) => {
        toast.error("Something went wrong");
        console.log(e.message);
      });
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + user.user._id)
      .then((res) => {
        setData(res.data.filled_slams);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [user.user._id]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL)
      .then((res) => {
        setUsers(
          res.data.filter((item) => {
            return item.username !== user.user.username;
          })
        );
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [user.user.username]);

  return (
    <div
      className="sharing-container"
      style={{
        border: "2px dashed #fff",
        height: "75vh",
        width: "80%",
        marginLeft: "10%",
        marginTop: "10vh",
      }}
    >
      {data.map((slam) => {
        return (
          <div style={{
            height: "20vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%"
          }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
              }}
            >
              <h1 style={{ color: "white" }}>{slam.name}</h1>
              <input value={search} onChange={handleChange} />
              {searchResults.map((item) => {
                return (
                  <h1
                    onClick={(e) => handleClick(e, slam, item)}
                    key={item._id}
                    style={{ color: "white" }}
                  >
                    {item.username}
                  </h1>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SharedSlams;
