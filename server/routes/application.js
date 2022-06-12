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

// helper all delete route
router.route("/delete").delete(async (req, res, next) => {
  try {
    await Application.deleteMany();
    res
      .status(200)
      .json({ success: true, message: "All applications deleted" });
  } catch (error) {
    next(error.message);
  }
});

router.route("/").get(getApplication);
router.route("/").post(uploader.array("files", 3), createApplication);
router.route("/:id").put(editApplication);
router.route("/:id").delete(deleteApplication);

module.exports = router;
