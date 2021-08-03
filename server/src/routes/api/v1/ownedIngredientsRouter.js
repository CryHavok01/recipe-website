import express from "express"
import { OwnedIngredient, User } from "../../../models/index.js"
import IngredientSerializer from "../../../serializers/IngredientSerializer.js"

const ownedIngredientsRouter = new express.Router()

ownedIngredientsRouter.get("/list/:userId", async (req, res) => {
  const { userId } = req.params
  try {
    const user = await User.query().findById(userId)
    const ownedIngredients = await user.$relatedQuery("ownedIngredients")
    const serializedIngredients = ownedIngredients.map(ingredient => {
      return IngredientSerializer.getIngredientInfo(ingredient)
    })

    return res.status(200).json({ ownedIngredients: serializedIngredients })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

ownedIngredientsRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const ingredient = await OwnedIngredient.query().findById(id)
    const serializedIngredient = IngredientSerializer.getIngredientInfo(ingredient)
    return res.status(200).json({ ingredient: serializedIngredient})
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default ownedIngredientsRouter