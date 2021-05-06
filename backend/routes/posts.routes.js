const express = require("express");
const router = express.Router();

const Post = require("../models/post.model");

router.get("/posts", async (req, res) => {
  try {
    const result = await Post.find({ status: "published" })
      .select("author created title photo")
      .sort({ created: -1 });
    if (!result) res.status(404).json({ post: "Not found" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const result = await Post.findById(req.params.id);
    if (!result) res.status(404).json({ post: "Not found" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post("/posts/add", async (req, res) => {
  try {
    const {
      author,
      created,
      updated,
      status,
      title,
      text,
      photo,
      price,
      phone,
      location,
    } = req.body;
    const newPost = new Post({
      author,
      created,
      updated,
      status,
      title,
      text,
      photo,
      price,
      phone,
      location,
    });
    await newPost.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/posts/:id/edit", async (req, res) => {
  const {
    author,
    created,
    updated,
    status,
    title,
    text,
    photo,
    price,
    phone,
    location,
  } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await Post.updateOne(
        { _id: req.params.id },
        {
          $set: {
            author,
            created,
            updated,
            status,
            title,
            text,
            photo,
            price,
            phone,
            location,
          },
        }
      );
      res.json({ message: "OK" });
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
