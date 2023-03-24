const express = require("express");
const router = express.Router();
const SlamTemp1 = require("../models/SlamSchema1");

//getting a request in the friends.
router.get("/", async (req, resp) => {
  try {
    const friends = await SlamTemp1.find();

    if (friends) {
      resp.status(200).json(friends);
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

//posting a request in friends.
router.post("/", async (req, resp) => {
  const {
    name,
    nick_name,
    dob,
    image,
    instagram,
    facebook,
    snapchat,
    phoneNumber,
    likes,
    dislikes,
    bestMemory,
    ourBestMemory,
    confession,
  } = req.body;

  try {
    const slamData = await SlamTemp1.create({
      name,
      nick_name,
      dob,
      image,
      instagram,
      facebook,
      snapchat,
      phoneNumber,
      likes,
      dislikes,
      bestMemory,
      ourBestMemory,
      confession,
    });

    if (slamData) {
      resp.status(200).json(slamData);
    }
  } catch (e) {
    resp.status(500).json({ error: e.message });
  }
});

module.exports = router;
