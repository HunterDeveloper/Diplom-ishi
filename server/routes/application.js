const { Router } = require("express");
const {
  getApplication,
  createApplication,
  deleteApplication,
  editApplication,
} = require("../controllers/application");
const router = Router();

router.route("/").get(getApplication);
router.route("/").post(createApplication);
router.route("/:id").put(editApplication);
router.route("/:id").delete(deleteApplication);

module.exports = router;
