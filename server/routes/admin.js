const { Router } = require("express");
const {
  getAdmins,
  createAdmin,
  deleteAdmin,
  editAdmin,
  login,
  getControlData,
} = require("../controllers/admin");
const { protect } = require("../middlewares/auth");

const router = Router();

router.route("/").get(getAdmins);
router.route("/").post(createAdmin);
router.route("/:id").put(editAdmin);
router.route("/:id").delete(deleteAdmin);
router.route("/auth").post(login);
router.route("/control").get(protect, getControlData);

module.exports = router;
