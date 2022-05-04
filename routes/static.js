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
    return res.render("home.html", { 
      name: req.session.user.name, 
      email: req.session.user.email,
      password: req.session.user.password,
      dob: req.session.user.dob, 
      cob: req.session.user.cob, 
      address: req.session.user.address, 
      gender: req.session.user.gender, 
      hobbies: req.session.user.hobbies, 
      civilstate: req.session.user.civilstate, 
      profession: req.session.user.profession, 
      salary: req.session.user.salary,
      sport: req.session.user.sport,
      image: req.session.user.image
    });
  }

  res.redirect("/");
});

router.get("/index", function (req, res) {
  if (req.session.user){
    return res.render("home.html", { 
      name: req.session.user.name, 
      email: req.session.user.email,
      password: req.session.user.password,
      dob: req.session.user.dob, 
      cob: req.session.user.cob, 
      address: req.session.user.address, 
      gender: req.session.user.gender, 
      hobbies: req.session.user.hobbies, 
      civilstate: req.session.user.civilstate, 
      profession: req.session.user.profession, 
      salary: req.session.user.salary,
      sport: req.session.user.sport,
      image: req.session.user.image
    });
  }
  res.render("index.html");
});

module.exports = router;