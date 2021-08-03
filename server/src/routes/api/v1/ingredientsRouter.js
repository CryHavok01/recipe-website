import express from "express"
import { Ingredient, User } from "../../../models/index.js"
import IngredientSerializer from "../../../serializers/IngredientSerializer.js"

const ingredientsRouter = new express.Router()

ingredientsRouter.get("/list/:userId", async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.query().findById(userId)
    const ingredients = await user.$relatedQuery("ingredients")
    const serializedIngredients = ingredients.map(ingredient => {
      return IngredientSerializer.getIngredientInfo(ingredient)
    })

    return res.status(200).json({ ingredients: serializedIngredients })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

ingredientsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const ingredient = await Ingredient.query().findById(id)
    const serializedIngredient = await IngredientSerializer.getIngredientWithPantryMeasurements(ingredient)
    return res.status(200).json({ ingredient: serializedIngredient})
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default ingredientsRouter