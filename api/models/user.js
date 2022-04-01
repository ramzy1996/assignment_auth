const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      lowercase: true,
    },
    lname: {
      type: String,
      lowercase: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    //   default: "default.png",
    // },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: "UserDetails" }
);

module.exports = mongoose.model("User", userSchema);
