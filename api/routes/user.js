const router = require("express").Router();
const Users = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// const path = require("path");
// const multer = require("multer");

// upload image
// const storage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     callback(null, "public/images");
//   },
//   filename: (req, file, callback) => {
//     callback(null, Date.now() + path.extname(file.originalname));
//   },
// });

// get all users
const validUser = (req, res, next) => {
  var token = req.header("auth");
  req.token = token;
  next();
};

router.get("/getAll", validUser, async (req, res) => {
  jwt.verify(req.token, process.env.JWT_TOKEN, async (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const data = await Users.find().select(["-password"]);
      res.json(data);
    }
  });
});

// find user by id
router.get("/:id", async (req, res) => {
  try {
    await Users.findById(req.params.id).then((user) => res.json(user));
  } catch (error) {
    res.status(500).json(error);
  }
});

// find user by id and update
router.put("/update/:id", async (req, res) => {
  // var emailExist = Users.findOne({ email: req.body.email });
  // if (emailExist) {
  //   return res.status(400).json("Email is already exist..");
  // }
  //*password hash
  var hash = await bcrypt.hash(req.body.password, 10);
  Users.findById(req.params.id).then((user) => {
    user.fname = req.body.fname;
    user.lname = req.body.lname;
    user.mobile = req.body.mobile;
    user.email = req.body.email;
    user.isAdmin = req.body.isAdmin;
    user.password = hash;

    user
      .save()
      .then(() => res.json("User is updated successfully"))
      .catch((err) => res.status(400).json(`Error: ${err}`));
  });
});
// find product by id and delete
router.delete("/:id", async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id).then(() =>
      res.json("User is deleted successfully")
    );
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
