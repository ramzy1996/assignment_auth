const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 8800;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URL;

// ddatabase connection
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("Database not connected");
    } else {
      console.log("Database connected successfully");
    }
  }
);

// port listen
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

// asingn image folder
app.use("/images", express.static(path.join(__dirname, "public/images")));

// route
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
