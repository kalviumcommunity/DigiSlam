import React from "react";
import call_logo from "./assets/Telephone_logo.png";
import { useAuthContext } from "./hooks/useAuthContext";
const Card = (props) => {
  const { user } = useAuthContext();
  const { data } = props;
  return (
    <div
      className="slam-card"
      onClick={() => window.open(`/basic_out/${user.user._id}/${data.slam.unique_id}`, "_blank")}
    >
      <img
        src={data.slam.image}
        className="slam-image"
        height={200}
        style={{
          borderRadius: "10px"
        }}
        alt="profile_image"
      />
      <div className="profile-info">
        <h1>{data.slam.name}</h1>
        <div className="social-info">
          <span>
            <img src={call_logo} height={35} alt="caller" />
            <p>{data.slam.phone}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
