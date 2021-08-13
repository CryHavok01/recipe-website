import express from "express"
import { PantryMeasurement } from "../../../models/index.js"

const recipesRouter = new express.Router()

recipesRouter.post("/make", async (req, res) => {
  const updatedIngredients = req.body
  const user = req.user
  try {
    for (const ingredient of updatedIngredients) {
      const originalMeasurement = await user.$relatedQuery("pantryMeasurements").where("ingredientId", ingredient.id).first()
      const newMeasurement = await PantryMeasurement.query().updateAndFetchById(originalMeasurement.id, { 
        amount: ingredient.amount,
        unit: ingredient.unit
      })
    }
    return res.status(200).json({ message: "ingredients updated" })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default recipesRouter