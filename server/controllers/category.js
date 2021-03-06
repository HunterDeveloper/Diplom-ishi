const Category = require("../models/Category");
const mongoose = require("mongoose");
const ErrorResponse = require("../utils/ErrorResponse");

exports.getCategory = async (req, res, next) => {
  try {
    const categories = await Category.find();

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error.message);
  }
};

exports.createCategory = (req, res, next) => {
  const category = req.body;
  const newCategory = new Category(category);
  try {
    newCategory.save();

    res.status(201).json({ success: true, data: newCategory });
  } catch (error) {
    next(error.message);
  }
};

exports.editCategory = async (req, res, next) => {
  const { id } = req.params;
  const category = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new ErrorResponse("No category with this id!", 404);
  }
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { ...category, id },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    next(error.message);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new ErrorResponse("No category with this id!", 404);
  }
  try {
    await Category.findByIdAndRemove(id);

    res.status(200).json({ success: true, message: "Successfully deleted" });
  } catch (error) {
    next(error.message);
  }
};
