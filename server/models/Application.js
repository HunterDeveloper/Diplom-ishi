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
    type: String,
    default: "There is no file not yet",
    required: [true, "Please enter application Files"],
  },
});

const Application = mongoose.model("Application", applicationSchema);
module.exports = Application;
