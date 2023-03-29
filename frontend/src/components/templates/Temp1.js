import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./template1.css";
import TempImg1 from "../assets/friendsImg1.png";
import TempImg2 from "../assets/friendsImg2.png";
import TempImg3 from "../assets/friendsImg3.png";
import { useAuthContext } from "../hooks/useAuthContext";
import { toast, ToastContainer } from "react-toastify";

const Temp1 = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [slamData, setSlamData] = useState({
    name: "",
    nick_name: "",
    dob: "",
    image: null,
    instagram: "",
    facebook: "",
    snapchat: "",
    phoneNumber: "",
    likes: "",
    dislikes: "",
    bestMoment: "",
    OurBestMemory: "",
    confession: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `http://localhost:8000/digislam/apis/users/${user.user._id}`,
      {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(slamData),
      }
    );
    const json = await response.json();
    if (response.ok) {
      console.log(json);
      toast.success("Submitted Succesfully", { className: "my-toast-body" });
      setTimeout(() => {
        navigate("/main", { replace: true });
      }, 3000);
    }
    if (!response.ok) {
      console.log(json.error);
    }
  };
  return (
    <div className="slamHolder">
      <header>
        <img src={TempImg3} alt="image1" height={200} />
        <p className="heading">
          "A friend knows the truth and the pain that you hide from the rest of
          the world."
        </p>
      </header>

      <form className="slamForm" onSubmit={handleSubmit}>
        <div className="row-1 row">
          <section>
            <div>
              <label for="name">Your Sweet Name</label>
              <input
                type="text"
                onChange={(e) =>
                  setSlamData({ ...slamData, name: e.target.value })
                }
              />
            </div>
            <div>
              <div
                className="image-input"
                onClick={() => document.querySelector("#image").click()}
              >
                {slamData.image === null ? (
                  <h1>+ Your Awesome Image</h1>
                ) : (
                  <img height={200} src={slamData.image} alt="imagee" />
                )}
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setSlamData({
                    ...slamData,
                    image: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />
            </div>
          </section>
          <section>
            <div>
              <label for="name">Your Friends Call You</label>
              <input
                type="text"
                onChange={(e) =>
                  setSlamData({ ...slamData, nick_name: e.target.value })
                }
              />
            </div>
            <div>
              <label for="name">Your Birthday</label>
              <input
                type="date"
                onChange={(e) =>
                  setSlamData({
                    ...slamData,
                    dob: e.target.value,
                  })
                }
              />
            </div>
          </section>
        </div>
        <div className="row-2 row">
          <section>
            <div className="image-row">
              <div>
                <div>
                  <label for="name">Your Instagram Id</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setSlamData({ ...slamData, instagram: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label for="name">Your Facebook Id</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setSlamData({ ...slamData, facebook: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <div>
                  <label for="name">Your Snap Id</label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setSlamData({ ...slamData, snapchat: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label for="name">I Can Ring You At</label>
                  <input
                    type="Number"
                    value={slamData.phoneNumber}
                    onChange={(e) =>
                      setSlamData({ ...slamData, phoneNumber: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <img src={TempImg2} height={200} alt="image2" className="image" />
          </section>
        </div>
        <div className="row-3 row">
          <section>
            <div>
              <label>One Thing You Like About Me</label>
              <textarea
                value={slamData.likes}
                onChange={(e) =>
                  setSlamData({ ...slamData, likes: e.target.value })
                }
              />
            </div>
            <div>
              <label>One Thing You Want Me To Improve</label>
              <textarea
                value={slamData.dislikes}
                onChange={(e) =>
                  setSlamData({ ...slamData, dislikes: e.target.value })
                }
              />
            </div>
          </section>
        </div>
        <div className="row-4 row">
          <section>
            <div>
              <label>The best moment of your life</label>
              <textarea
                value={slamData.bestMoment}
                onChange={(e) =>
                  setSlamData({ ...slamData, bestMoment: e.target.value })
                }
              />
            </div>
            <div>
              <label>Our best memory together</label>
              <textarea
                value={slamData.OurBestMemory}
                onChange={(e) =>
                  setSlamData({ ...slamData, OurBestMemory: e.target.value })
                }
              />
            </div>
          </section>
        </div>
        <div className="row-5 row">
          <section>
            <div>
              <label>Anything you want me to tell me</label>
              <textarea
                value={slamData.confession}
                onChange={(e) =>
                  setSlamData({ ...slamData, confession: e.target.value })
                }
              />
              <button>Submit</button>
            </div>
            <img src={TempImg1} height={200} alt="image3" className="image" />
          </section>
        </div>
      </form>
    </div>
  );
};

const Template1 = () => {
  return (
    <>
      <Temp1 />
      <ToastContainer />
    </>
  );
};

export default Template1;
