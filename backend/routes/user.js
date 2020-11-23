const express = require("express");
const router = express.Router();
const User = require("../models/user");
const {
  doUserSignUp,
  doUserSignIn,
  readProfile,
} = require("../controllers/userControllers");
const auth = require("../middlewares/auth");

router.post("/sign-up", doUserSignUp);
router.post("/sign-in", doUserSignIn);
router.get("/me/:id", auth, readProfile);

module.exports = router;
