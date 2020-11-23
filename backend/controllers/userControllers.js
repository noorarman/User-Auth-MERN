const User = require("../models/user");
exports.doUserSignUp = async function (req, res) {
  try {
    const userAlreadyExists = await User.findOne({ email: req.body.email });
    if (userAlreadyExists)
      return res
        .status(400)
        .send({ msg: "this email already  exists, try to login instead" });
    const newUser = new User(req.body);
    const token = newUser.generateAuthToken();
    await newUser.save();
    const user = {
      name: newUser.name,
      email: newUser.email,
    };
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
exports.doUserSignIn = async function (req, res) {
  try {
    const signInUser = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = signInUser.generateAuthToken();
    const user = {
      name: signInUser.name,
      email: signInUser.email,
    };
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};
exports.readProfile = async function (req, res) {
  try {
    res.send(req.user);
  } catch (error) {
    res.status(400).send({ msg: "User not found" });
  }
};
