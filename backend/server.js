require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserRoutes = require("./routes/UserRoutes");
const SlamRoutes = require("./routes/SlamRoutes1")
const cors = require("cors");
const PORT = process.env.PORT;
const DB = process.env.DB;

app.use(express.json());
app.use(cors());
app.use("/digislam/apis/users", UserRoutes);
app.use("/digislam/apis/friends", SlamRoutes);

mongoose
  .connect(DB, { useNewUrlParser: true, family: 4 })
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Connection to database successful and listening on PORT:${PORT}`
      );
    });
  })
  .catch((e) => {
    console.log(e);
  });
