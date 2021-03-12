const router = require("express").Router();

router.use("/users", require("./user"));
router.use("/posts", require("./post"));
router.use("/favorites", require("./favorite"));

module.exports = router;
