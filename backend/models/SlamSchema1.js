const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SlamSchema1 = new Schema({
  name: String,
  nick_name: String,
  dob: {
    type: String,
    required: true,
  },
  image: String,
  instagram: String,
  facebook: String,
  snapchat: String,
  phoneNumber: Number,
  likes: String,
  dislikes: String,
  bestMoment: String,
  OurBestMemory: String,
  confession: String,
});

module.exports = mongoose.model("SlamData", SlamSchema1);
