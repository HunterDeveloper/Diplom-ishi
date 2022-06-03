const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const ErrorResponse = require("../utils/ErrorResponse");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    ("Bearer das23fn23489237nv9873843829v283nv932874");
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ErrorResponse("Not authorized to acces this route", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return next(new ErrorResponse("No admin found with this id ", 404));
    }

    req.admin = admin;

    next();
  } catch (error) {
    next(new ErrorResponse("Not authorized to acces this route", 401));
  }
};
