import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.json({ error: "Name is required in body" });
    }

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.json({ error: "Category already exists in database" });
    }

    const category = await new Category({ name }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const category = await Category.findOne({ _id: categoryId });

    if (!category) {
      return res.status(404).json({ error: "Category not found in database" });
    }

    category.name = name;

    const updatedCategory = await category.save();

    res.json(updatedCategory);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Internal server error in updating category" });
  }
});

const removeCategory = asyncHandler(async (req, res) => {
  try {
    const removed = await Category.findByIdAndDelete(req.params.categoryId);
    res.json(removed);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Internal server error in removing category" });
  }
});

const listCategories = asyncHandler(async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ error: "Internal server error in listing categories" });
  }
});

const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    res.json(category);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "Internal server error in reading category" });
  }
});

export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategories,
  readCategory,
};
