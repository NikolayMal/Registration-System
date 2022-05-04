const express = require("express");
const app = express();
const router = express.Router();
// Require path
const path = require("path");


// static routes
router.get("/", (req, res) => {
  res.sendFile('main.html', { root: path.join(__dirname, '../views') });
});

router.get("/home", function (req, res) {
  if (req.session.user) {
    console.log(req.session.user);
    return res.render("home.html", { name: req.session.user.name });
  }
  res.redirect("/");
});

router.get("/index", function (req, res) {
  if (req.session.user){
    return res.render("home.html", { name: req.session.user.name });
  }
  res.render("index.html");
});

module.exports = router;