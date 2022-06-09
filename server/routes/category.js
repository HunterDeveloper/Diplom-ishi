const { Router } = require("express");
const {
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/category");
const { protect } = require("../middlewares/auth");
const router = Router();

router.route("/").get( getCategory);
router.route("/").post(protect, createCategory);
router.route("/:id").put(protect, editCategory);
router.route("/:id").delete(protect, deleteCategory);

module.exports = router;
