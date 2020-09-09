const express = require("express");
const router = express.Router();
const Posts = require("../models/postModel");

// @route   GET api/posts
// @desc    Get All Posts
// @access  Public
router.get("/", async (req, res) => {
    try {
      const getPost = await Posts.find();
      if(getPost.length<=0){
        res.json({Message:'No post yet'})
      }else{
        res.json(getPost);
      }
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  });

// @route   GET api/posts/:id
// @desc    Get Single Post
// @access  Public
router.get("/:id", async (req, res) => {
    try {
      const getPost = await Posts.findById({ _id: req.params.id });
      if(getPost.length<=0){
        res.json({Message:'No post found'})
      }
      else{
      res.json(getPost);
      }
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  });

  // @route   GET api/posts/:userId
// @desc    Get All Post of specific user
// @access  Public
router.get("/=/:userId", async (req, res) => {
    try {
      const getPost = await Posts.find({ userId: req.params.userId });
      if(getPost.length<=0){
        res.json({Message:'No post yet'})
      }
      else{
      res.json(getPost);
      }
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  });

   // @route   POST api/user/
// @desc    Add A User
// @access  Private
router.post("/", async (req, res) => {
    const userId = req.body.userId;
    const postMessage = req.body.postMessage;
    const postImage = req.body.postImage;

    const newPosts = new Posts({
      userId,
      postMessage,
      postImage,
    });
    try {
      const createPost = await newPosts.save();
      res.json({ dbRes: createPost, isSuccess: true });
    } catch (err) {
      res.json({ dbRes: err, isSuccess: false });
    }
  });

   // @route   PUT api/posts/:id
// @desc    Update the POSTS
// @access  Private
router.put("/:id", async (req, res) => {
    try {
      const updatePost = await Posts.findByIdAndUpdate(req.params.id, {
        $set: {
          postMessage: req.body.postMessage,
          postImage: req.body.postImage,
          updatedAt: Date.now(),
        },
      });
      if (updatePost) res.status(201).json("Post updated.");
      else res.status(400).json("Error found.");
    } catch (error) {
      res.status(501).json({ Error: error });
    }
  });

// @route   PATCH api/posts/:id
// @desc    Update A POSTS
// @access  Private
router.patch("/:id", async (req, res) => {
  let forUpdate = {};
  if (req.body.userId) forUpdate.userId = req.body.userId;
  if (req.body.postMessage) forUpdate.postMessage = req.body.postMessage;
  if (req.body.postImage) forUpdate.postImage = req.body.postImage;
  if (req.body.postLikes) forUpdate.postLikes = req.body.postLikes;
  if (req.body.comment) forUpdate.comment = req.body.comment;
  if (req.body.isVisible) forUpdate.isVisible = req.body.isVisible;
  try {
    const updatePosts = await Posts.findByIdAndUpdate(req.params.id, {
      $set: forUpdate,
      updatedAt: Date.now(),
    });
    if (updatePosts) res.status(201).json("Posts updated.");
    else res.status(400).json("Error found.");
  } catch (error) {
    res.status(500).json({ Error: error });
  }
});
module.exports = router;