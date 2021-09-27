import express from "express"
import { Ingredient, PantryMeasurement, User } from "../../../models/index.js"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
import IngredientSerializer from "../../../serializers/IngredientSerializer.js"
import editIngredient from "../../../services/editIngredient.js"
const { ValidationError, NotNullViolationError } = objection

const ingredientsRouter = new express.Router()

ingredientsRouter.post("/", async (req, res) => {
  const { newIngredient } = req.body
  const user = req.user
  const cleanedIngredient = cleanUserInput(newIngredient)

  try {
    const existingIngredient = await Ingredient.query().findOne({ name: cleanedIngredient.name })
    if (existingIngredient) {

      const ingredientInPantry = await user.$relatedQuery("ingredients").where({ name: cleanedIngredient.name })
      if (ingredientInPantry.length > 0) {
        return res.status(422).json({ 
          errors: {
            "Looks like": [{
              message: "you already own this ingredient!  Please edit that ingredient instead of creating a new one." 
            }]
          }
        })
      }

      const relatedIngredient = await User.transaction(async (trx) => {
        const relatedIngredient = await user.$relatedQuery("ingredients", trx).relate({
          id: existingIngredient.id,
          amount: cleanedIngredient.amount,
          unit: cleanedIngredient.unit,
          description: cleanedIngredient.description
        })
        return relatedIngredient
      })
      return res.status(201).json({ message: "Successful input" })
    }

    const fetchedIngredient = await User.transaction(async (trx) => {
      const fetchedIngredient = await user.$relatedQuery("ingredients", trx).insertAndFetch(cleanedIngredient)
      return fetchedIngredient
    })
    return res.status(201).json({ message: "Successful input" })
  } catch(err) {
    if (err instanceof ValidationError || err instanceof NotNullViolationError) {
      return res.status(422).json({ errors: err.data})
    }
    return res.status(500).json({ err })
  }
})

ingredientsRouter.patch("/", async (req, res) => {
  const { editedIngredient } = req.body
  const user = req.user
  const ingredientId = editedIngredient.id
  const cleanedIngredient = cleanUserInput(editedIngredient)

  try {
    const updatedIngredient = await editIngredient(user, ingredientId, cleanedIngredient)
    if (updatedIngredient === "already in pantry") {
      return res.status(422).json({
        errors: {
          "Looks like": [{
            message: "you already have an ingredient with the same name in your pantry!  Please edit that ingredient instead, or use a different name." 
          }]
        }
      })
    }
    const serializedIngredient = IngredientSerializer.getIngredientWithDetails(updatedIngredient)
    return res.status(200).json({ editedIngredient: serializedIngredient})
  } catch(err) {
    if (err instanceof ValidationError || err instanceof NotNullViolationError) {
      return res.status(422).json({ errors: err.data})
    }
    return res.status(500).json({ err })
  }
})

ingredientsRouter.delete("/", async (req, res) => {
  const { ingredientId } = req.body
  const user = req.user
  try {
    const deleted = await user.$relatedQuery("pantryMeasurements").delete().where("ingredientId", ingredientId)
    return res.status(200).json({ message: "Successful deletion" })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default ingredientsRouter