const { Router } = require("express");
const {
  getApplication,
  createApplication,
  deleteApplication,
  editApplication,
} = require("../controllers/application");
const { protect } = require("../middlewares/auth");
const Application = require("../models/Application");
const { uploader } = require("../utils/fileUpload");
const router = Router();

router.route("/").get(getApplication);
router.route("/").post(uploader.array("files", 3), createApplication);
router.route("/:id").put(protect, editApplication);
router.route("/:id").delete(protect, deleteApplication);

// helper all delete route
router.route("/delete").delete(async (req, res, next) => {
  await Application.deleteMany();
  res.json("Deleted");
});

module.exports = router;
