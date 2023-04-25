import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
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
import { useAuthContext } from "../hooks/useAuthContext";

const Template = () => {
  const { user } = useAuthContext();
  const state = user === null;
  const routeParam = useParams();
  const { id } = routeParam;
  const navigate = useNavigate();
  const [img, setImg] = useState("");
  const [Data, setData] = useState({
    unique_id: uuidv4(),
    sid: id,
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
  const image_box = document.getElementById("image");
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Data.name === "") {
      toast.error("Please Enter Your Name");
    } else {
      toast.warn("Submitting...");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}${id}/${user.user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(Data),
        }
      );

      const data = response.json();

      if (response.ok) {
        toast("Submitted Succesfully.");
        console.log(data);
        setTimeout(() => {
          navigate(user !== null ? "/main" : "/login", { replace: true });
        }, 3500);
      }
      if (!response.ok) {
        toast.error(data.error);
        console.log(data);
      }
    }
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setImg(URL.createObjectURL(file));
    const base64 = await convertToBase64(file);
    setData({ ...Data, image: base64 });
  };

  return state ? (
    <>
      <h1>Login First</h1>
      <Link to="/login">
        <button>Go to Login Page</button>
      </Link>
    </>
  ) : (
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
            <p className="image-instruction" style={{ fontSize: "x-large" }}>
              Please Upload A Clear Picture Of Yours:{" "}
            </p>
            {img === "" ? (
              <div
                className="input-image"
                style={{ cursor: "pointer" }}
                onClick={() => image_box.click()}
              >
                <p style={{ fontSize: "larger" }}>
                  + <br />
                  <br />
                  Your Awesome Image
                </p>
              </div>
            ) : (
              <div className="input-image">
                <img
                  src={img}
                  height={225}
                  width={175}
                  alt="uploaded_image"
                  style={{ cursor: "pointer" }}
                  onClick={() => image_box.click()}
                />
              </div>
            )}
            <input
              style={{ display: "none" }}
              type="file"
              id="image"
              accept=".jpeg, .png, .jpg"
              onChange={(e) => handleFileUpload(e)}
            />
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
        <button>Submit</button>
      </form>
    </>
  );
};

const BasicTemplate = () => {
  return (
    <>
      <Template />
      <ToastContainer autoClose="2000" />
    </>
  );
};

export default BasicTemplate;
