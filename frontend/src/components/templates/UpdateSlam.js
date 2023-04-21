import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Template.css";
import { ToastContainer, toast } from "react-toastify";
import friendsUnderTree from "../assets/friends_under_tree.svg";
import upload_img_illu from "../assets/image_post.svg";
import fav_song_illu from "../assets/fav_song.svg";
import fears_illu from "../assets/fears_image.webp";
import winner_illu from "../assets/winner.svg";
import hate_illu from "../assets/hate_illu.png";
import like_illu from "../assets/like_me.svg";
import improve_illu from "../assets/improve.svg";
import phone_logo from "../assets/call_logo.webp";
import insta_logo from "../assets/insta_logo.png";
import axios from "axios";

const Template = () => {
  const { user } = useAuthContext();
  const routeParam = useParams();
  const navigate = useNavigate();
  const [Data, setData] = useState({
    unique_id: routeParam.id,
    name: "",
    instagram: "",
    phone: "",
    image: "",
    biggest_fear: "",
    favourite_song: "",
    accomplishment: "",
    dislike: "",
    goodness: "",
    improve: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        `${process.env.REACT_APP_API_URL}update/${user.user._id}/${Data.usersId}/${routeParam.id}`,
        Data
      )
      .then((res) => {
        toast(res.data.mssg);
        setTimeout(() => {
          navigate("/main", { replace: true });
        }, 3500);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}${routeParam.user_id}`)
      .then((res) => {
        setData(res.data.my_slams[0]);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, [routeParam.user_id]);

  return (
    <>
      <header className="header">
        <p>THE STORY OF MY LIFE</p>
        <img src={friendsUnderTree} height={200} alt="friends" />
      </header>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="row">
          <div className="svg-field">
            <div className="row-content">
              <label style={{ fontSize: "32px" }}>Name</label>
              <input
                type="text"
                style={{
                  height: "5vh",
                  width: "20vw",
                  fontSize: "x-large",
                  padding: "5px",
                  color: "#000",
                  marginTop: "0.7em",
                  fontFamily: "'Lilita One', cursive",
                }}
                value={Data.name}
                onChange={(e) => setData({ ...Data, name: e.target.value })}
              />
            </div>
            <div className="row-content">
              <span>
                <img src={phone_logo} height={50} alt="phone_logo" />
              </span>
              <input
                type="Number"
                className="phone"
                style={{
                  height: "5vh",
                  width: "20vw",
                  fontSize: "x-large",
                  padding: "5px",
                  color: "#333",
                  fontFamily: "'Lilita One', cursive",
                }}
                value={Data.phone}
                onChange={(e) => setData({ ...Data, phone: e.target.value })}
              />
            </div>
            <div className="row-content">
              <span>
                <img src={insta_logo} height={50} alt="instagram_logo" />
              </span>
              <input
                type="text"
                style={{
                  height: "5vh",
                  width: "20vw",
                  fontSize: "x-large",
                  padding: "5px",
                  color: "#000",
                  fontFamily: "'Lilita One', cursive",
                }}
                value={Data.instagram}
                onChange={(e) =>
                  setData({ ...Data, instagram: e.target.value })
                }
              />
            </div>
          </div>
          <div className="svg-field">
            <img src={upload_img_illu} height={200} alt="upload_img" />
            <div className="input-image">
              <img
                src={Data.image}
                height={250}
                width={200}
                alt="uploaded_image"
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="svg-field">
            <div className="row-content">
              <label style={{ alignSelf: "flex-start" }}>
                Your Favorite Song and <br />
                Why It's Special to You
              </label>
              <textarea
                value={Data.favourite_song}
                onChange={(e) =>
                  setData({ ...Data, favourite_song: e.target.value })
                }
              />
            </div>
            <img src={fav_song_illu} height={200} alt="fav_song" />
          </div>
          <div className="svg-field reverse">
            <img src={fears_illu} height={200} alt="fear_img" />
            <div className="row-content">
              <label style={{ alignSelf: "flex-start" }}>Biggest Fear</label>
              <textarea
                value={Data.biggest_fear}
                onChange={(e) =>
                  setData({ ...Data, biggest_fear: e.target.value })
                }
              />
            </div>
          </div>
          <div className="svg-field">
            <div className="row-content">
              <label style={{ alignSelf: "flex-start" }}>
                Your Greatest Accomplishment
              </label>
              <textarea
                value={Data.accomplishment}
                onChange={(e) =>
                  setData({ ...Data, accomplishment: e.target.value })
                }
              />
            </div>
            <img src={winner_illu} height={200} alt="winner" />
          </div>
          <div className="svg-field reverse">
            <img src={hate_illu} alt="hate" />
            <div className="row-content">
              <label style={{ alignSelf: "flex-start" }}>
                Thing You Hate The Most
              </label>
              <textarea
                value={Data.dislike}
                onChange={(e) => setData({ ...Data, dislike: e.target.value })}
              />
            </div>
          </div>
          <div className="svg-field">
            <div className="row-content">
              <label style={{ alignSelf: "flex-start" }}>
                Things You Like About Me
              </label>
              <textarea
                value={Data.goodness}
                onChange={(e) => setData({ ...Data, goodness: e.target.value })}
              />
            </div>
            <img src={like_illu} height={200} alt="likes" />
          </div>
          <div className="svg-field reverse">
            <img src={improve_illu} height={200} alt="improve" />
            <div className="row-content">
              <label style={{ alignSelf: "flex-start" }}>
                Things You Want Me To Work Upon
              </label>
              <textarea
                value={Data.improve}
                onChange={(e) => setData({ ...Data, improve: e.target.value })}
              />
            </div>
          </div>
        </div>
        <button>Update</button>
      </form>
    </>
  );
};

const UpdateSlam = () => {
  return (
    <>
      <Template />
      <ToastContainer autoClose="2000" />
    </>
  );
};

export default UpdateSlam;
