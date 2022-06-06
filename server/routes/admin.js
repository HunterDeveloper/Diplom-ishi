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

router.route("/").get(protect, getAdmins);
router.route("/").post(protect, createAdmin);
router.route("/:id").put(protect, editAdmin);
router.route("/:id").delete(protect, deleteAdmin);
router.route("/auth").post(login);
router.route("/control").get(protect, getControlData);

module.exports = router;
