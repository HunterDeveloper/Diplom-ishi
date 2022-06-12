const { Router } = require("express");
const {
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/category");
const { protect } = require("../middlewares/auth");
const router = Router();

router.route("/").get(getCategory);
router.route("/").post(createCategory);
router.route("/:id").put(editCategory);
router.route("/:id").delete(deleteCategory);

module.exports = router;
