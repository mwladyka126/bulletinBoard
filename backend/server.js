const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const passportSetup = require("./config/passport");

const app = express();

const postsRoutes = require("./routes/posts.routes");
const usersRoutes = require("./routes/users.routes");
const authRoutes = require("./routes/auth.routes");

require("dotenv").config();

/* INIT SESSION MECHANISM */
app.use(session({ secret: "anything" }));

/* INIT PASSPORT */
app.use(passport.initialize());
app.use(passport.session());

/* MIDDLEWARE */
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use("/api", postsRoutes);
app.use("/api", usersRoutes);
app.use("/auth", authRoutes);

/* API ERROR PAGES */
app.use("/api", (req, res) => {
  res.status(404).send({ post: "Not found..." });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, "../build")));
app.use("/public/uploads", express.static(__dirname + "/public/uploads/"));
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

/* MONGOOSE */
mongoose.connect(
  `mongodb+srv://${process.env.mongoApp}:${process.env.mongoPass}@cluster0.w1mbx.mongodb.net/BulletinBoard?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to the database");
});
db.on("error", (err) => console.log("Error: " + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Server is running on port: " + port);
});
