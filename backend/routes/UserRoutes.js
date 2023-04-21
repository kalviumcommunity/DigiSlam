require("dotenv").config();
const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const SECRET = process.env.SECRET;
const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: "86400" });
};

// appending slam data
router.put("/:_id/:user_id", async (req, resp) => {
  const { _id, user_id } = req.params;
  const {
    unique_id,
    name,
    instagram,
    phone,
    image,
    biggest_fear,
    favourite_song,
    accomplishment,
    dislike,
    goodness,
    improve,
  } = req.body;
  try {
    let result = null;
    if (image) {
      result = await cloudinary.uploader.upload(image, {
        folder: "digislam",
        width: 500,
      });
    }

    const user = await User.findByIdAndUpdate(
      { _id },
      {
        $addToSet: {
          filled_slams: {
            unique_id,
            name,
            instagram,
            phone,
            image: result
              ? result.secure_url
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
            biggest_fear,
            favourite_song,
            accomplishment,
            dislike,
            goodness,
            improve,
          },
        },
      },
      { new: true }
    );
    const new_user = await User.findByIdAndUpdate(
      { _id: user_id },
      {
        $addToSet: {
          my_slams: {
            unique_id,
            usersId: _id,
            name,
            instagram,
            phone,
            image: result
              ? result.secure_url
              : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png",
            biggest_fear,
            favourite_song,
            accomplishment,
            dislike,
            goodness,
            improve,
          },
        },
      },
      { new: true }
    );
    if (!user || !new_user) {
      resp.status(400).json({ error: "Update unsuccesful" });
    } else {
      resp.status(200).json({ mssg: "Update successful" });
    }
  } catch (e) {
    resp.status(401).json({ error: e.message });
  }
});

//getting all the users in digislam
router.get("/", async (req, resp) => {
  try {
    const user = await User.find();
    if (!user) {
      resp.status(400).json({ error: "Not Found" });
    } else {
      resp.status(200).json(user);
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

//signing in the user
router.post("/signup", async (req, resp) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);

    //creating token
    const token = createToken(User._id);
    resp.status(200).json({ token, user });
  } catch (e) {
    resp.status(400).json({ error: e.message });
  }
});

//Sending the slam to others
router.post("/share/:_id", async (req, resp) => {
  const { _id } = req.params;
  const slam = req.body;

  try {
    const sent_slam = await User.findByIdAndUpdate(
      _id,
      {
        $addToSet: { received_slams: slam },
      },
      { new: true }
    );

    if (!sent_slam) {
      resp.status(400).json({ e: "Something went wrong." });
    } else {
      resp.status(200).json(sent_slam);
    }
  } catch (e) {
    resp.status(500).json({ e: e.message });
  }
});

//logging the user in
router.post("/login", async (req, resp) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);

    //creating a token
    const token = createToken(user._id);

    resp.status(200).json({ token, user });
  } catch (e) {
    resp.status(401).json({ error: e.message });
  }
});

//deleting a slam
router.delete("/delete/:_id/:user_id/:slam_id", async (req, resp) => {
  const { _id, user_id, slam_id } = req.params;
  try {
    const Update_owner = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { my_slams: { unique_id: slam_id } },
      },
      { new: true }
    );

    const Update_user = await User.findByIdAndUpdate(
      { _id: user_id },
      { $pull: { filled_slams: { unique_id: slam_id } } },
      { new: true }
    );

    if (!Update_owner || !Update_user) {
      resp.status(400).json({ mssg: "Something went wrong" });
    } else {
      resp.status(200).json({ mssg: "Deleted Successfully." });
    }
  } catch (e) {
    resp.status(500).json({ mssg: e.message });
  }
});

router.patch("/update/:_id/:user_id/:slam_id", async (req, resp) => {
  const { _id, user_id, slam_id } = req.params;
  const data = req.body;

  try {
    const Update = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { my_slams: { unique_id: slam_id } },
      },
      { new: true }
    );

    const UpdatedSlam = await User.findByIdAndUpdate(
      _id,
      { $push: { my_slams: data } },
      { new: true }
    );

    const Change = await User.findByIdAndUpdate(
      { _id: user_id },
      { $pull: { filled_slams: { unique_id: slam_id } } },
      { new: true }
    );

    const ChangedSlam = await User.findByIdAndUpdate(
      { _id: user_id },
      { $push: { filled_slams: data } }
    );

    if (!UpdatedSlam || !Update || !Change || !ChangedSlam) {
      resp.status(400).json({ mssg: "Something went wrong." });
    } else {
      resp.status(200).json({ mssg: "Updated Successfully" });
    }
  } catch (e) {
    resp.status(500).json({ mssg: e.message });
  }
});

//getting a user by Id
router.get("/:_id", async (req, resp) => {
  const { _id } = req.params;
  try {
    const user = await User.findById(_id);

    if (!user) {
      resp.status(400).json("No such user exists");
    } else {
      resp.status(200).json(user);
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});
module.exports = router;
