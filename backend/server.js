require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const UserRoutes = require("./routes/UserRoutes");
const cors = require("cors");
const PORT = process.env.PORT;
const MONGODB_TEST = process.env.MONGODB_TEST;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cors());
app.use("/digislam/apis/users", UserRoutes);

mongoose.set("strictQuery", false);

mongoose
  .connect(MONGODB_TEST, {
    family: 4
  })
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
