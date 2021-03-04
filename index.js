var express = require("express");
var app = express();
var port = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("get /");
  res.send("/ It works!");
});

app.listen(port);
