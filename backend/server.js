const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./db/mongoose");



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/users", require("./routes/user"));

const PORT = 5000;

app.listen(PORT,()=>console.log("api runnging on port " + PORT + ": "));
