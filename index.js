const express = require("express");
const app = express();
config = require("./configs/app");

//Express Configs
require("./configs/express")(app);

const http = require("http");
const server = http.Server(app);
const io = require("socket.io")(server);

let connectedUsers = {};
io.on("connection", (socket) => {
  const { user_id } = socket.handshake.query;
  connectedUsers[user_id] = socket.id;

  // connected io success
  console.log("User connected :", socket.id);
  //console.log("connectedUsers : ", socket.handshake.query);
  console.log("user setup is : ", connectedUsers);
  socket.on("disconnect", function () {
    console.log("Received: disconnect event from client: " + socket.id);
  });

  socket.emit("welcome", `welcome client id #${socket.id}`);
});

//socket.io
app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;
  // res.io = io;
  res.connectedUsers = connectedUsers;

  return next();
});

//Routes
app.use(require("./routes"));

// app.use("/", (req, res, next) => {
//   res.status(200).json({
//     message: "It works!1234",
//   });
// });

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

/* GET users listing. */
app.get("/", function (req, res, next) {
  res.io.emit("socketToMe", "users");
  res.send("respond with a resource.");
  console.log(req.connectedUsers[req.io.socket]);
});

app.get("/web", (req, res) => {
  res.sendFile(__dirname + "/client.html");
});

//const server = app.listen(config.port, () => {
server.listen(process.env.PORT, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Server is running at http://${host}:${port}`);
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
});
// const http = require("http");
// const server = http.Server(app);
// const io = require("socket.io")(server);

// const connectedUsers = {};
// io.on("connection", (socket) => {
//   // connected io success
//   console.log("User connected :", socket.id);

//   socket.on("disconnect", function () {
//     console.log("Received: disconnect event from client: " + socket.id);
//   });

//   const { user_id } = socket.handshake.query;
//   connectedUsers[user_id] = socket.id;

//   socket.emit("welcome", `welcome client id #${socket.id}`);
// });

// //socket.io
// app.use((req, res, next) => {
//   req.io = io;
//   req.connectedUsers = connectedUsers;
//   // res.io = io;
//   // res.connectedUsers = connectedUsers;

//   return next();
// });
