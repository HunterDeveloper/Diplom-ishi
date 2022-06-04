const { Router } = require("express");
const {
  getAdmins,
  createAdmin,
  deleteAdmin,
  editAdmin,
  login,
} = require("../controllers/admin");
const router = Router();

router.route("/").get(getAdmins);
router.route("/").post(createAdmin);
router.route("/:id").put(editAdmin);
router.route("/:id").delete(deleteAdmin);
router.route("/auth").post(login);

module.exports = router;
