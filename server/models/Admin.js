const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter admin name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter admin email adress"],
  },
  password: {
    type: Number,
    required: [true, "Please enter admin password"],
  },
  status: {
    type: String,
    required: [true, "Please enter admin status"],
  },
});

adminSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
