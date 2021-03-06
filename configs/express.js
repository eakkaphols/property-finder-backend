const express = require("express"),
  cors = require("cors");
const { route } = require("../routes");

// const swaggerJsDoc = require("swagger-jsdoc");
// const swaggerUI = require("swagger-ui-express");
// const swaggerDefinition = {
//   openapi: "3.0.0",
//   info: {
//     title: "Property Finder Library API",
//     version: "1.0.0",
//   },
//   servers: [
//     {
//       url: "http://localhost:3000/api/v1",
//       description: "Development server",
//     },
//   ],
// };

// const options = {
//   swaggerDefinition,
//   // Paths to files containing OpenAPI definitions
//   apis: ["./routes/api/user.js", "./index.js"],
// };

// const swaggerSpec = swaggerJsDoc(options);

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

  //Paser body
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  //Swagger UI and JSDoc
  //app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};
