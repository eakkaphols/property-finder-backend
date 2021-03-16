const router = require("express").Router();
const controllers = require("../../controllers/favorite.controller");
const validator = require("../../validators");

router.get("/", controllers.onGetAll);
router.get("/:id", controllers.onGetById);
router.get("/postedby/:id", controllers.onGetByPostedById);
router.post("/", controllers.onInsert);
router.put("/:id", controllers.onUpdate);
router.delete("/:id", controllers.onDelete);

module.exports = router;
