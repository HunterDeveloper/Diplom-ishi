const { Router } = require("express");
const {
  getApplication,
  createApplication,
  deleteApplication,
  editApplication,
} = require("../controllers/application");
const { protect } = require("../middlewares/auth");
const router = Router();

router.route("/").get(protect, getApplication);
router.route("/").post(createApplication);
router.route("/:id").put(protect, editApplication);
router.route("/:id").delete(protect, deleteApplication);

module.exports = router;
