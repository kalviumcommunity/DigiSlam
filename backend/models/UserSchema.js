const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const Validator = require("validator");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  slams: {
    type: Array,
    default: [],
    items: {
      type: [
        {
          unique_id: String,
          uid: String,
          sid: String,
          name: String,
          instagram: String,
          phone: Number,
          image: String,
          biggest_fear: String,
          favourite_song: String,
          accomplishment: String,
          dislike: String,
          goodness: String,
          improve: String,
        },
      ],
    },
  },

  received: {
    type: Array,
    default: [],
    items: {
      type: [
        {
          shared_id: String,
          slam_id: String,
        },
      ],
    },
  },
});

UserSchema.statics.signup = async function (username, email, password) {
  // validation
  if (!username || !email || !password) {
    throw Error("All fields must be filled.");
  }
  if (!Validator.isEmail(email)) {
    throw Error("Email is not Valid.");
  }
  if (!Validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough.");
  }

  const existingEmail = await this.findOne({ email });
  const existingUsername = await this.findOne({ username });

  if (existingEmail) {
    throw Error("Email already in use.");
  }
  if (existingUsername) {
    throw Error("Username already taken.");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

//static user login method

UserSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", UserSchema);
