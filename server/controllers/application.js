const Application = require("../models/Application");
const mongoose = require("mongoose");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getApplication = async (req, res, next) => {
  try {
    const applications = await Application.find();

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    next(error.message);
  }
};

exports.createApplication = (req, res, next) => {
  const application = req.body;
  let files = [];
  try {
    if (req.files) req.files.map((f) => files.push(f.filename));
    application.files = files;
    const newApplication = new Application(application);
    newApplication.save();

    res.status(201).json({ success: true, data: newApplication });
  } catch (error) {
    next(error.message);
  }
};

exports.editApplication = async (req, res, next) => {
  const { id } = req.params;
  const application = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new ErrorResponse("No application with this id!");
  }
  try {
    const updatedApplication = await Application.findByIdAndUpdate(
      id,
      { ...application, id },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedApplication });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteApplication = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Application.findByIdAndRemove(id);

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    next(error.message);
  }
};
