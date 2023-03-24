const express = require("express");
const User = require("../models/UserSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
const requireAuth = require("../middlewares/requireAuth")
const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: "365d" });
};

// router.use(requireAuth);

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

//posting the user data on sign up
router.post("/signup", async (req, resp) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.signup(username, email, password);

    //creating token
    const token = createToken(User._id);
    resp.status(200).json({token, user});
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
    const token = createToken(user._id)

    resp.status(200).json({token, user});
  } catch (e) {
    resp.status(400).json({ error: e.message });
  }
});

module.exports = router;
