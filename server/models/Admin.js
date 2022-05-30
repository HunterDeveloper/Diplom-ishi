const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter admin name"],
  },
  email: {
    type: String,
    required: [true, "Please enter admin email adress"],
  },
  password: {
    type: Number,
    required: [true, "Please enter admin password"],
  },
});

const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin