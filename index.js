const express = require("express");
const app = express();
config = require("./configs/app");
const swaggerJsDoc = require("swagger-jsdoc"),
  swaggerUI = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "https://www.github.com/eakkaphols",
        url: "https://www.github.com/eakkaphols",
        email: "eakkaphol.s@hotmail.com",
      },
    },
    schemes: ["http", "https"],
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
      {
        url: "https://xlan-property-finder.herokuapp.com/api/v1",
        description: "Production server",
      },
    ],
  },
  apis: ["./routes/api/user.js"],
};

//Express Configs
require("./configs/express")(app);

//Routes
app.use(require("./routes"));

//swaggerDocs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.get("/test", function (req, res) {
  console.log("get /test");
  res.send("/test It works!");
});

app.post("/demotoken", function (req, res) {
  var token = req.param("token");
  if (token != "") token = decodingJWT(token);
  res.status(200).json({
    data: token,
  });
});

app.use("/", (req, res, next) => {
  res.status(200).json({
    message: "It works!",
  });
});

const decodingJWT = (token) => {
  console.log("decoding JWT token");
  if (token !== null || token !== undefined) {
    const base64String = token.split(".")[1];
    const decodedValue = JSON.parse(
      Buffer.from(base64String, "base64").toString("ascii")
    );
    console.log(decodedValue);
    return decodedValue;
  }
  return null;
};

//const server = app.listen(config.port, () => {
const server = app.listen(process.env.PORT, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`Server is running at http://${host}:${port}`);
  console.log(`Server is running in ${process.env.NODE_ENV} mode`);
});
