var express = require("express");
var cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
//for upload files
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

//mongodb connection
// const mySecret = process.env["MONGO_URI"];
// const mongoose = require("mongoose");
// mongoose.connect(mySecret, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

//api for uploading files
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  console.log(req.file);
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size,
  });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
