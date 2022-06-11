const Application = require("../models/Application");
const mongoose = require("mongoose");
const ErrorResponse = require("../utils/ErrorResponse");
const multer = require("multer");

var storage = multer.diskStorage({
  fileFilter: function (req, file, callback) {
    if (
      ["png", "gif", "jpg", "mp4", "jpeg"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }
    callback(null, true);
  },
  destination: function (req, file, callback) {
    callback(null, ".../uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({ storage: storage }).array("files", 2);

exports.getApplication = async (req, res, next) => {
  try {
    const applications = await Application.find();

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    next(error.message);
  }
};

exports.createApplication = (req, res, next) => {
  console.log(req.body);
  console.log(req.files);
  try {
    // upload(req, res, function (err) {
    //   //console.log(req.body);
    //   console.log(req.files);
    //   if (err) {
    //     return res.end("Error uploading file.");
    //   }
    //   res.end("File is uploaded");
    // });

    // const application = req.body;
    // const newApplication = new Application(application);

    // newApplication.save();

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
