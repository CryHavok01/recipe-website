import express from "express"
import { User } from "../../../models/index.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"

const recipesRouter = new express.Router()

recipesRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.query().findById(userId)
    const recipes = await user.$relatedQuery("recipes")
    const serializedRecipes = recipes.map(recipe => {
      return RecipeSerializer.getSummary(recipe)
    })
    return res.status(200).json({ recipes: serializedRecipes })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default recipesRouter