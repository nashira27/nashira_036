import Recipe from "../models/recipeModal.js";
// import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import { ObjectId } from "mongoose";

export const filterRecipe = async (req, res, next) => {
  try {
    const filteredData = await Recipe.find(req.body);
    res.status(200).json(filteredData);
  } catch (error) {
    next(error);
  }
};

export const getRecipe = async (req, res, next) => {
  try {
    const result = await Recipe.findById(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const addRecipe = async (req, res, next) => {
  try {
    const newRecipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients || [],
      instructions: req.body.instructions || [],
      cookingTime: req.body.cookingTime || 0,
      rating: req.body.rating || 0,
      userId: req.body.userId,
    });
    const addedRecipe = await newRecipe.save();
    res.status(200).json(addedRecipe);
  } catch (error) {
    next(error);
  }
};

export const updateRecipe = async (req, res, next) => {
  //   if (req.user.id !== req.body.user) {
  //     return next(errorHandler(401, "Unauthorised"));
  //   }

  const isExists = await Recipe.findById(req.params.id);
  if (!isExists) {
    return next(errorHandler(404, "Recipe not found"));
  }

  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          ingredients: req.body.ingredients,
          instructions: req.body.instructions,
          cookingTime: req.body.cookingTime,
          rating: req.body.rating,
          userId: req.body.userId,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  //   if (req.user.id !== req.body.user) {
  //     return next(errorHandler(401, "Unauthorised"));
  //   }
  const isExists = await Recipe.findById(req.params.id);
  if (!isExists) {
    return next(errorHandler(404, "Recipe not found"));
  }

  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json("Recipe has been deleted");
  } catch (error) {
    next(error);
  }
};
