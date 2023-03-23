const jwt = require("jsonwebtoken");
const User = require("../models/UserSchema");

const requireAuth = async (req, resp, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return resp.status(401).json({ error: "Authorization token required." });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (e) {
    resp.status(401).json({ error: "Request not verified." });
  }
};

module.exports = requireAuth;
