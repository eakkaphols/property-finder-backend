const router = require("express").Router();
const config = require("../configs/app");

router.use(`/api/v${config.apiVersion}`, require("./api"));

module.exports = router;

// const router = require("express").Router();
// import { apiVersion } from "../configs/app";

// router.use(`/api/v${apiVersion}`, require("./api"));

// export default router;
