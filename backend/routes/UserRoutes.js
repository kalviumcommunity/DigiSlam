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

// appending the slam
router.put("/:_id/:u_id", async (req, resp) => {
  const { _id, u_id } = req.params;
  const {
    unique_id,
    sid,
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
    const user = await User.findByIdAndUpdate(_id, {
      $push: {
        slams: {
          unique_id,
          uid: u_id,
          sid,
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
    });
    if (!user) {
      resp.status(400).json({ mssg: "something went wrong." });
    } else {
      resp.status(200).json(user);
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
  const data = req.body;

  try {
    const sent_slam = await User.findByIdAndUpdate(
      _id,
      {
        $addToSet: { received: data },
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
router.delete("/delete/:_id/:slam_id", async (req, resp) => {
  const { _id, slam_id } = req.params;
  try {
    const Delete = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { slams: { unique_id: slam_id } },
      },
      { new: true }
    );

    if (!Delete) {
      resp.status(400).json({ mssg: "Could not delete" });
    } else {
      resp.status(200).json(Delete);
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

router.patch("/update/:_id/:slam_id", async (req, resp) => {
  const { _id, slam_id } = req.params;
  const data = req.body;

  try {
    const Remove = await User.findByIdAndUpdate(
      _id,
      {
        $pull: { slams: { unique_id: slam_id } },
      },
      { new: true }
    );

    const Update = await User.findByIdAndUpdate(
      _id,
      { $addToSet: { slams: data } },
      { new: true }
    );

    if (!Remove || !Update) {
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
