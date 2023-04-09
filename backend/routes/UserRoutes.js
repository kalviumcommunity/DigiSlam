require("dotenv").config();
const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");
const SECRET = process.env.SECRET;
const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: "365d" });
};

// appending slam data
router.put("/:_id", async (req, resp) => {
  const { _id } = req.params;
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
        width: 100,
        crop: "scale",
      });
    }

    const user = await User.findOneAndUpdate(
      { _id },
      {
        $addToSet: {
          slams: {
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
    if (!user) {
      resp.status(400).json({ error: "Update unsuccesful" });
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
