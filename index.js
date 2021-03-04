const express = require("express"),
  app = express(),
  config = require("./configs/app");

//Express Configs
require("./configs/express")(app);

//Routes
app.use(require("./routes"));

//API test
app.get("/test", function (req, res) {
  console.log("get /test");
  res.send("/test It works!");
});

app.use("/", (req, res, next) => {
  res.status(200).json({
    message: "It works!",
  });
});

//const server = app.listen(config.port, () => {
const server = app.listen(process.env.PORT, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Server is running at http://${host}:${port}`);
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
});
