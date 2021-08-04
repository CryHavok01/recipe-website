import express from "express"
import { User } from "../../../models/index.js"
import IngredientSerializer from "../../../serializers/IngredientSerializer.js"

const usersIngredientsRouter = new express.Router({ mergeParams: true })

usersIngredientsRouter.get("/", async (req, res) => {
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

usersIngredientsRouter.get("/:ingredientId", async (req, res) => {
  const { userId, ingredientId } = req.params
  try {
    const ingredients = await User.relatedQuery("ingredients").for(userId).where("ingredientId", ingredientId)
    const serializedIngredient = await IngredientSerializer.getIngredientWithDetails(ingredients[0])
    return res.status(200).json({ ingredient: serializedIngredient})
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default usersIngredientsRouter