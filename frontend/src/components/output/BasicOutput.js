import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./output.css";
import axios from "axios";
import telephone from "../assets/Telephone_logo.png";
import insta_logo from "../assets/insta_logo.png";
import admin from "../assets/admin-logo.png";
import { BsBackspace } from "react-icons/bs";

const BasicOutput = () => {
  const routeParams = useParams();
  const { user_id, id } = routeParams;
  const [slams, setSlams] = useState([]);
  useEffect(() => {
    axios.get(process.env.REACT_APP_API_URL + user_id).then((response) => {
      const user_slam = response.data.slams.filter((slam) => {
        return slam.unique_id === id;
      });
      setSlams(user_slam[0]);
    });
  }, [user_id, id]);

  return (
    <div className="output-container">
      <h1>THE STORY OF MY LIFE</h1>
      <div className="slam-social-info">
        <div className="name-holder">
          <img
            src={slams && slams.image}
            height={250}
            alt="profile_img"
            style={{
              borderRadius: "10px",
              border: "2px solid black",
            }}
          />
        </div>
        <div className="social-holder">
          <span>
            <img src={admin} height={50} alt="telephone" />
            <h2>{slams.name}</h2>
          </span>
          <span>
            <img src={insta_logo} height={50} alt="insta" />
            <h2>{slams.instagram}</h2>
          </span>
          <span>
            <img src={telephone} height={50} alt="telephone" />
            <h2>{slams.phone}</h2>
          </span>
        </div>
      </div>
      <div className="label-info-container">
        <div className="label-info-holder">
          <label>My Biggest Fear</label>
          <p>{slams.biggest_fear}</p>
        </div>
        <div className="label-info-holder">
          <label>My Favourite Song And The Reason</label>
          <p>{slams.favourite_song}</p>
        </div>
        <div className="label-info-holder">
          <label>My Biggest Accomplishment According To Me</label>
          <p>{slams.accomplishment}</p>
        </div>
        <div className="label-info-holder">
          <label>One Thing That I Don't Like</label>
          <p>{slams.dislike}</p>
        </div>
        <div className="label-info-holder">
          <label>Things That I Like About You</label>
          <p>{slams.goodness}</p>
        </div>
        <div className="label-info-holder">
          <label>Things That I Want You To Improve</label>
          <p>{slams.improve}</p>
        </div>
      </div>
      <BsBackspace
        className="back-button"
        style={{
          cursor: "pointer",
        }}
        size={50}
        onClick={() => {
          window.close();
        }}
      />
    </div>
  );
};

export default BasicOutput;
