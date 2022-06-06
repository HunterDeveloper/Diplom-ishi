const { default: mongoose } = require("mongoose");
const Admin = require("../models/Admin");
const Application = require("../models/Application");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find();

    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    next(error.message);
  }
};

exports.createAdmin = async (req, res, next) => {
  const admin = req.body;
  try {
    const adminOne = await Admin.findOne();

    if (!adminOne) {
      admin.status = "owner";
    } else {
      admin.status = "admin";
    }

    const newAdmin = new Admin(admin);

    newAdmin.save();

    res.status(201).json({ success: true, data: newAdmin });
  } catch (error) {
    next(error.message);
  }
};

exports.editAdmin = async (req, res, next) => {
  const { id } = req.params;
  const admin = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new ErrorResponse("No admin with this id!", 404);
  }
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(
      id,
      { ...admin, id },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedAdmin });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteAdmin = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new ErrorResponse("No admin with this id!", 404);
  }
  try {
    await Admin.findByIdAndRemove(id);

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    next(error.message);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("PLease provide an email and a password! ", 400)
    );
  }

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return next(new ErrorResponse("Invalid credenetials", 401));
    }

    const isMatch = admin.password === password;

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(admin, 201, res);
  } catch (error) {
    next(error.message);
  }
};

exports.getControlData = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: "You got access to the private data in this route",
    admin: req.admin,
  });
};

const sendToken = (admin, statusCode, res) => {
  const token = admin.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
