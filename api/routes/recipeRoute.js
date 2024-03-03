import express from "express";
import {
  filterRecipe,
  addRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.get("/filter", filterRecipe);
router.post("/add", addRecipe);
router.get("/:id", getRecipe);
router.put("/update/:id", verifyToken, updateRecipe);
router.delete("/delete/:id", verifyToken, deleteRecipe);

export default router;
