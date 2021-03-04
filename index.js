const express = require("express"),
  app = express(),
  config = require("./configs/app");

//Express Configs
require("./configs/express")(app);

//Routes
app.use(require("./routes"));

//API test
app.get("/test1", (req, res) => {
  console.log("get /");
  res.send("/ It works!");
});

app.get("/test2", function (req, res) {
  console.log("get /test");
  res.send("/test It works!");
});

app.use((req, res, next) => {
  res.status(200).json({
    message: "It works! test",
  });
});

// // Start Server
// const server = app.listen(config.port, () => {
//   let host = server.address().address;
//   let port = server.address().port;
//   console.log(`Server is running at http://${host}:${port}`);
//   console.log(`Server is running in ${process.env.NODE_ENV} mode`);
// });

// const server = app.listen(config.port, () => {
//   //let host = server.address().address;
//   let port = server.address().port;
//   //console.log(`Server is running at http://${host}:${port}`);
//   //console.log(`Server is running in ${process.env.NODE_ENV} mode`);
// });

// var port = process.env.PORT || 3000;
app.listen(config.port);
