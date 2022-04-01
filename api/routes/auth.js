const router = require("express").Router();
const userSchema = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register user
router.post("/register", async (req, res) => {
  try {
    var emailExist = await userSchema.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json("Email is already exist..");
    }
    //*password hash
    var hash = await bcrypt.hash(req.body.password, 10);
    const user = await new userSchema({
      fname: req.body.fname,
      lname: req.body.lname,
      isAdmin: req.body.isAdmin,
      mobile: req.body.mobile,
      // image: req.body.image,
      email: req.body.email,
      password: hash,
    });
    var data = await user.save();
    res.json(data);
  } catch (err) {
    res.status(400).json(err);
  }
  //   res.json(user);
});

// login
router.post("/login", async (req, res) => {
  try {
    var userData = await userSchema.findOne({ email: req.body.email });
    if (!userData) {
      return res.status(400).json("Email is not exist..");
    }
    var validPass = await bcrypt.compare(req.body.password, userData.password);

    if (!validPass) {
      return res.status(400).json("Password is not valid");
    }
    var userToken = await jwt.sign(
      {
        email: userData.email,
      },
      process.env.JWT_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    // res.header("auth", userToken).json(userToken);
    res.status(200).send({
      id: userData._id,
      token: userToken,
      isAdmin: userData.isAdmin,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
