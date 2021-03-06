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
        res.json(getUsers);
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
      res.status(500).json({ Error: error });
    }
  });
  
  // @route   POST api/user/
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

  // @route   PUT api/user/:id
// @desc    Update A User
// @access  Private
router.put("/:id", async (req, res) => {
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        phoneNumber: req.body.phoneNumber,
        gender: req.body.gender,
        address: req.body.address,
        birthDay: req.body.birthDay,
        profilePicture: req.body.profilePicture,
        bio: req.body.bio,
        role: req.body.role,
        isBlocked: req.body.isBlocked,
        updatedAt: Date.now(),
      },
    });
    if (updateUser) res.status(201).json("User updated.");
    else res.status(400).json("Error found.");
  } catch (error) {
    res.status(501).json({ Error: error });
  }
});

// @route   PATCH api/user/:id
// @desc    Update A User
// @access  Private
router.patch("/:id", async (req, res) => {
  let forUpdate = {};
  if (req.body.gender) forUpdate.gender = req.body.gender;
  if (req.body.role) forUpdate.role = req.body.role;
  if (req.body.isBlocked) forUpdate.isBlocked = req.body.isBlocked;
  if (req.body.username) forUpdate.username = req.body.username;
  if (req.body.password) forUpdate.password = req.body.password;
  if (req.body.firstName) forUpdate.firstName = req.body.firstName;
  if (req.body.lastName) forUpdate.lastName = req.body.lastName;
  if (req.body.emailAddress) forUpdate.email = req.body.emailAddress;
  if (req.body.phoneNumber) forUpdate.phoneNumber = req.body.phoneNumber;
  if (req.body.address) forUpdate.address = req.body.address;
  if (req.body.bio) forUpdate.bio = req.body.bio;
  if (req.body.birthDay) forUpdate.birthDay = req.body.birthDay;
  if (req.body.profilePicture) forUpdate.profilePicture = req.body.profilePicture;
  try {
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
      $set: forUpdate,
      updatedAt: Date.now(),
    });
    if (updateUser) res.status(201).json("User updated.");
    else res.status(400).json("Error found.");
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});

// @route   DELETE api/user/:id
// @desc    Delete A User
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const deleteUser = await User.findById(req.params.id);
    deleteUser.remove();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(501).json({ Error: error });
  }
});

  module.exports = router;