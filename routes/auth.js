const jwt = require("express-jwt");
secret = require("../configs/app").secret;

const getTokenFromHeader = (req) => {
  if (
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Token") ||
    (req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer")
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const auth = {
  required: jwt({
    secret: secret,
    getToken: getTokenFromHeader,
  }),
  optional: jwt({
    secret: secret,
    credentialsRequired: false,
    getToken: getTokenFromHeader,
  }),
};

// function authenticateToken(req, res, next) {
//   const token = getTokenFromHeader;
//   if (!token) return res.sendStatus(401); // if there isn't any token
//   jwt({
//     secret: secret,
//     getToken: getTokenFromHeader,
//   });
//   // }, (err, user) => {
//   //   if (err) {
//   //     return res.sendStatus(403);
//   //   }
//   //   req.user = user;
//   //   next();
//   // });
// }

module.exports = auth;
