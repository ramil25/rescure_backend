const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// @route   GET api/user
// @desc    Get All User
// @access  Public
router.get("/", async (req, res) => {
    try {
      const getUsers = await User.find();
      if(getUsers.length<=0){
        res.json({Feedback:'No data found'})
      }else{
        res.send(getUsers);
      }
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  });

  // @route   GET api/user/:id
// @desc    Get Single User
// @access  Public
router.get("/:id", async (req, res) => {
    try {
      const getUser = await User.findById({ _id: req.params.id });
      res.json(getUser);
    } catch (error) {
      res.status(501).json({ Error: error });
    }
  });
  
  // @route   POST api/user/add
// @desc    Add A User
// @access  Private
router.post("/", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const address =req.body.address;
    const birthDay = req.body.birthDay;
    const emailAddress = req.body.emailAddress;
    const phoneNumber =req.body.phoneNumber;
    const gender = req.body.gender;
    const newUser = new User({
      username,
      password,
      firstName,
      lastName,
      birthDay,
      address,
      emailAddress,
      phoneNumber,
      gender,
    });
    try {
      const createUser = await newUser.save();
      res.json({ dbRes: createUser, isSuccess: true });
    } catch (err) {
      res.json({ dbRes: err, isSuccess: false });
    }
  });

  module.exports = router;