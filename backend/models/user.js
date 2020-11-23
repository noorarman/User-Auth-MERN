const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    maxlength: 50,
    minlength: 6,
  },
});

userSchema.statics.findByCredentials = async function (email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("this email account does not exist!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("incorrect password!");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};
userSchema.pre("save", async function (next) {
  try {
    this.password = await bcrypt.hash(this.password, 8);
    next();
  } catch (error) {
    throw new Error(error);
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
