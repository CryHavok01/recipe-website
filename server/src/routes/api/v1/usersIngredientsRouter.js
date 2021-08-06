import express from "express"
import { User } from "../../../models/index.js"
import IngredientSerializer from "../../../serializers/IngredientSerializer.js"

const usersIngredientsRouter = new express.Router({ mergeParams: true })

usersIngredientsRouter.get("/", async (req, res) => {
  const user = req.user
  try {
    const ingredients = await user.$relatedQuery("ingredients")
    const serializedIngredients = ingredients.map(ingredient => {
      return IngredientSerializer.getIngredientInfo(ingredient)
    })

    return res.status(200).json({ ingredients: serializedIngredients })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

usersIngredientsRouter.get("/:ingredientId", async (req, res) => {
  const { ingredientId } = req.params
  const user = req.user
  try {
    const ingredient = await user.$relatedQuery("ingredients").where("ingredientId", ingredientId).first()
    const serializedIngredient = await IngredientSerializer.getIngredientWithDetails(ingredient)
    return res.status(200).json({ ingredient: serializedIngredient})
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default usersIngredientsRouter