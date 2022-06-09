const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema({
  city: {
    type: String,
    required: [true, "Please enter application name"],
  },
  region: {
    type: String,
    required: [true, "Please enter application email adress"],
  },
  categoryId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Please enter application password"],
  },
  description: {
    type: String,
    required: [true, "Please enter application description"],
  },
  files: {
    type: Array,
    default: "There is no file not yet",
    required: [true, "Please enter application Files"],
  },
  status: {
    type: String,
    required: true,
    default: "in-progress",
  },
  date: { type: Date, default: Date.now },
  name: String,
  surname: String,
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
