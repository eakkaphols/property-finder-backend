const router = require("express").Router();
const controllers = require("../../controllers/user.controller");
//const auth = require("../auth");
const validator = require("../../validators");

router.get("/", controllers.onGetAll);
router.get("/:id", controllers.onGetById);
router.post("/login", controllers.onLogin);

module.exports = router;
