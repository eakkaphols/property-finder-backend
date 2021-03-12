const express = require("express");
const app = express();
config = require("./configs/app");
const http = require("http").Server(app);
const io = require("socket.io")(http);

const connectedUsers = {};
io.on("connection", (socket) => {
  // connected io success
  console.log("A user connected ", socket.id);

  socket.on("disconnect", function () {
    console.log("User disconnected");
  });

  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;
});

//Express Configs
require("./configs/express")(app);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

//Routes
app.use(require("./routes"));

app.use("/", (req, res, next) => {
  res.status(200).json({
    message: "It works!",
  });
});

// app.get("/test", function (req, res) {
//   console.log("get /test");
//   res.send("/test It works!");
// });

// app.post("/demotoken", function (req, res) {
//   var token = req.param("token");
//   if (token != "") token = decodingJWT(token);
//   res.status(200).json({
//     data: token,
//   });
// });

// const decodingJWT = (token) => {
//   console.log("decoding JWT token");
//   if (token !== null || token !== undefined) {
//     const base64String = token.split(".")[1];
//     const decodedValue = JSON.parse(
//       Buffer.from(base64String, "base64").toString("ascii")
//     );
//     console.log(decodedValue);
//     return decodedValue;
//   }
//   return null;
// };

//const server = app.listen(config.port, () => {
const server = app.listen(process.env.PORT, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Server is running at http://${host}:${port}`);
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
});
