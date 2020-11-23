const mongoose = require("mongoose");

module.exports = mongoose
  .connect("mongodb://127.0.0.1:27017/Tasks-DB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((_) => console.log("connected to db"))
  .catch((err) => console.warn(err));
