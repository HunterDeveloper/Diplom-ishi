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
  const newApplication = new Application(application);

  try {
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
  try{
    
  }
  catch(error){
      next(error.message)
  }
};
