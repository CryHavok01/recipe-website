import express from "express"
import { User } from "../../../models/index.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
import IngredientSerializer from "../../../serializers/IngredientSerializer.js"

const homePageDetailsRouter = new express.Router()

homePageDetailsRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.query().findById(userId)
    const recipes = await user.$relatedQuery("recipes")
    const serializedRecipes = recipes.map(recipe => {
      return RecipeSerializer.getSummary(recipe)
    })

    const ingredients = await user.$relatedQuery("ingredients")
    const serializedIngredients = ingredients.map(ingredient => {
      return IngredientSerializer.getIngredientInfo(ingredient)
    })

    return res.status(200).json({ recipes: serializedRecipes, ingredients: serializedIngredients })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default homePageDetailsRouter