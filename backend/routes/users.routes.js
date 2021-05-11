const express = require("express");
const router = express.Router();
const User = require("../models/user.model");

router.get("/users", async (req, res) => {
  try {
    const result = await User.find();
    if (!result) res.status(404).json({ message: "Not found" });
    else res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/user/logged", async (req, res) => {
  try {
    const isVerified = await req.user;
    if (!isVerified) {
      res.status(404).json({ message: "Not found" });
    } else {
      const userEmail = req.user.emails[0].value;
      User.countDocuments({ email: userEmail }, async (err, count) => {
        if (count > 0) {
          const loggedUser = User.findOne({ email: userEmail });
          if (!loggedUser) res.status(404).json({ message: "Not found" });
          else {
            loggedUser.isLogged = true;
            loggedUser.save();
            return res.redirect("http://localhost:3000/");
          }
        } else {
          const newUser = new User({
            name: req.user.displayName,
            email: userEmail,
            role: "user",
            phone: "",
            location: "",
            isLogged: true,
          });
          await newUser.save();
          return res.redirect("http://localhost:3000/");
        }
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    const isVerified = await req.user;
    if (!isVerified) {
      res.status(404).json({ message: "Not found" });
    } else {
      const userEmail = req.user.emails[0].value;
      const loggedUser = User.findOne({ email: userEmail });
      if (!loggedUser) res.status(404).json({ message: "Not found" });
      else {
        loggedUser.isLogged = false;
        await loggedUser.save();
        req.logout();
        return res.redirect("http://localhost:3000/");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
