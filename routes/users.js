const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const models = require("../models/users");

router.post("/login", async (req, res) => {
  try {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20).required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    let checkUserLogin = await models.verifyUser(result.value);
    if (checkUserLogin.error) {
      throw checkUserLogin.message;
    }
    // set session for the logged in user
    req.session.user = {
      name: checkUserLogin.data.name,
      email: checkUserLogin.data.email,
    };
    res.json(checkUserLogin);
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const schema = joi.object().keys({
      name: joi.string().min(3).max(45).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20).required(),
      dob: joi.string().min(1).max(45).required(),
      cob: joi.string().min(1).max(45).required(),
      address: joi.string().min(3).max(60).required(),
      gender: joi.string().min(2).max(20).required(),
      hobbies: joi.string().min(2).max(100).required(),
      civilstate: joi.string().min(2).max(20).required(),
      profession: joi.string().min(2).max(30).required(),
      salary: joi.string().min(2).max(30).required(),
    });

    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    let addUserResponse = await models.addUser(result.value);
    res.json(addUserResponse);
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
  }
  res.redirect("/");
});

router.post("/details", async (req, res) => {
  console.log('post details');
  try {
    console.log('in try')
    const schema = joi.object().keys({
      name: joi.string().min(3).max(45).required(),
      email: joi.string().email().required(),
      password: joi.string().min(6).max(20).required(),
      dob: joi.string().min(1).max(45).required(),
      cob: joi.string().min(1).max(45).required(),
      address: joi.string().min(3).max(60).required(),
      gender: joi.string().min(2).max(20).required(),
      hobbies: joi.string().min(2).max(100).required(),
      civilstate: joi.string().min(2).max(20).required(),
      profession: joi.string().min(2).max(30).required(),
      salary: joi.string().min(2).max(30).required(),
    });
    console.log('after schema');

    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    console.log('after validate');
    let addUserDetailsResponse = await models.addUserDetails(result.value);
    res.json(addUserDetailsResponse);
  } catch (e) {
    console.log('error here');
    res.json({ error: true, message: e });
  }
})

module.exports = router;