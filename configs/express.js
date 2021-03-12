const express = require("express"),
  cors = require("cors");
const { route } = require("../routes");
(passport = require("passport")), (path = require("path"));
const fileupload = require("express-fileupload");


module.exports = async (app) => {
  // Connect MongoDB
  require("../configs/databases");



  // // CORS
  // const allowedOrigins = ["*"];
  // const corsOptions = {
  //   origin: function (origin, callback) {
  //     if (!origin) return callback(null, true);
  //     if (allowedOrigins.indexOf(origin) === -1) {
  //       const msg =
  //         "The CORS policy for this site does not " +
  //         "allow access from the specified Origin";
  //       return callback(new Error(msg), false);
  //     }
  //     return callback(null, true);
  //   },
  // };
  // app.use(cors(corsOptions));

  var multer = require("multer");

  //Paser body
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: false }));

  // Passport
  require("../configs/passport");

  //express-fileupload
  app.use(
    fileupload({
      useTempFiles: true,
    })
  );
};
