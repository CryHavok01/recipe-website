import express from "express"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
import { User } from "../../../models/index.js"

const usersRecipesRouter = new express.Router({ mergeParams: true })

usersRecipesRouter.get("/", async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.query().findById(userId)
    const recipes = await user.$relatedQuery("recipes")
    const serializedRecipes = recipes.map(ingredient => {
      return RecipeSerializer.getRecipeInfo(ingredient)
    })

    return res.status(200).json({ recipes: serializedRecipes })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

usersRecipesRouter.get("/:recipeId", async (req, res) => {
  const { userId, recipeId } = req.params
  try {
    const recipes = await User.relatedQuery("recipes").for(userId).where("recipeId", recipeId)
    const serializedRecipe = await RecipeSerializer.getRecipeWithDetails(recipes[0])
    return res.status(200).json({ recipe: serializedRecipe })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default usersRecipesRouter