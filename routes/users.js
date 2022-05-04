const express = require("express");
const router = express.Router();
const joi = require("@hapi/joi");
const models = require("../models/users");

router.post("/login", async (req, res) => {
  try {
    const schema = joi.object().keys({
      email: joi.string().email().required(),
      password: joi.string().required(),
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
      password: checkUserLogin.data.password,
      dob: checkUserLogin.data.dob,
      cob: checkUserLogin.data.cob,
      address: checkUserLogin.data.address,
      gender: checkUserLogin.data.gender,
      hobbies: checkUserLogin.data.hobbies,
      civilstate: checkUserLogin.data.civilstate,
      profession: checkUserLogin.data.profession,
      salary: checkUserLogin.data.salary, 
      sport: checkUserLogin.data.sport, 
      image: checkUserLogin.data.image, 
    };
    res.json(checkUserLogin);
  } catch (e) {
    res.json({ error: true, message: e });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const schema = joi.object().keys({
      name: joi.string().regex(/^[a-zA-Z0-9]*$/),
      email: joi.string().email().required(),
      password: joi.string().regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/),
      dob: joi.string().min(1).max(45).required(),
      cob: joi.string().min(1).max(45).required(),
      address: joi.string().min(3).max(60).required(),
      gender: joi.string().min(2).max(20).required(),
      hobbies: joi.string().min(2).max(100).required(),
      civilstate: joi.string().min(2).max(20).required(),
      profession: joi.string().min(2).max(30).required(),
      salary: joi.string().min(2).max(30).required(),
      sport: joi.string().min(2).max(30).required(),
      image: joi.string().min(2).max(30).required(),
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
      // Create a field called name. using regex ensure that the name is only numbers or letters
      name: joi.string().regex(/^[a-zA-Z0-9]*$/),
      email: joi.string().email().required(),
      password: joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{10,30}/),
      dob: joi.string().min(1).max(45).required(),
      cob: joi.string().min(1).max(45).required(),
      address: joi.string().min(3).max(60).required(),
      gender: joi.string().min(2).max(20).required(),
      hobbies: joi.string().min(2).max(100).required(),
      civilstate: joi.string().min(2).max(20).required(),
      profession: joi.string().min(2).max(30).required(),
      salary: joi.string().min(2).max(30).required(),
      sport: joi.string().min(2).max(30).required(),
      image: joi.string().min(2).max(30).required(),
    });
    console.log('after schema');

    const result = schema.validate(req.body);
    if (result.error) {
      throw result.error.details[0].message;
    }
    console.log('after validate');
    let updateUserDetailsResponse = await models.updateUserDetails(result.value);
    // set session for the logged in user
    req.session.user = {
      name: updateUserDetailsResponse.data.name,
      email: updateUserDetailsResponse.data.email,
      password: updateUserDetailsResponse.data.password,
      dob: updateUserDetailsResponse.data.dob,
      cob: updateUserDetailsResponse.data.cob,
      address: updateUserDetailsResponse.data.address,
      gender: updateUserDetailsResponse.data.gender,
      hobbies: updateUserDetailsResponse.data.hobbies,
      civilstate: updateUserDetailsResponse.data.civilstate,
      profession: updateUserDetailsResponse.data.profession,
      salary: updateUserDetailsResponse.data.salary,
      sport: updateUserDetailsResponse.data.sport,
      image: updateUserDetailsResponse.data.image,
    };
    res.json(updateUserDetailsResponse);
  } catch (e) {
    console.log('error here');
    console.log(e);
    res.json({ error: true, message: e });
  }


})

module.exports = router;