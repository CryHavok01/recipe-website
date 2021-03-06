import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = [
  "/",
  "/user-sessions/new", 
  "/users/new", 
  "/home", 
  "/ingredients", 
  "/ingredients/new", 
  "/ingredients/:id", 
  "/recipes",
  "/recipes/new",
  "/recipes/:recipeId",
  "/edit-recipe/:id",
  "/search",
  "/search/:id"
];
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
