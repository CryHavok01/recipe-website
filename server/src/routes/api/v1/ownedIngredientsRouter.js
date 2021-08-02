import express from "express"
import { User } from "../../../models/index.js"
import IngredientSerializer from "../../../serializers/IngredientSerializer.js"

const ownedIngredientsRouter = new express.Router()

ownedIngredientsRouter.get("/:userId", async (req, res) => {
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

export default ownedIngredientsRouter