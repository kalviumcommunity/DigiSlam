import React from "react";
import insta from "./assets/insta_logo.png";
import { useAuthContext } from "./hooks/useAuthContext";
const Card = (props) => {
  const { user } = useAuthContext();
  const { data } = props;
  return (
    data && (
      <div
        className="slam-card"
        onClick={() => {
          window.open(
            `/basic_out/${user.user._id}/${data.slam.unique_id}`,
            "_blank"
          );
        }}
      >
        <img
          src={data.slam.image}
          className="slam-image"
          height={200}
          width={150}
          style={{
            borderRadius: "10px",
          }}
          alt="profile_image"
        />
        <div className="profile-info">
          <h1>{data.slam.name}</h1>
          <div className="social-info">
            <span>
              <img src={insta} height={35} alt="caller" />
              <p>{data.slam.instagram}</p>
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default Card;
