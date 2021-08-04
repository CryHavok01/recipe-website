import express from "express"
import { Ingredient, PantryMeasurement, User } from "../../../models/index.js"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
const { ValidationError, NotNullViolationError } = objection

const ingredientsRouter = new express.Router()

ingredientsRouter.post("/", async (req, res) => {
  const { newIngredient, userId } = req.body
  const cleanedIngredient = cleanUserInput(newIngredient)

  try {
    const existingIngredient = await Ingredient.query().findOne({ name: cleanedIngredient.name })
    if (existingIngredient) {

      const ingredientInPantry = await User.relatedQuery("ingredients").for(userId).where({ name: cleanedIngredient.name })
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
        const user = await User.query(trx).findById(userId)
        const relatedIngredient = await user.$relatedQuery("ingredients", trx).relate({
          id: existingIngredient.id,
          amount: cleanedIngredient.amount,
          unit: cleanedIngredient.unit,
          description: cleanedIngredient.description
        })
        return relatedIngredient
      })
      return res.status(201).json("Successful input")
    }

    const fetchedIngredient = await User.transaction(async (trx) => {
      const user = await User.query(trx).findById(userId)
      const fetchedIngredient = await user.$relatedQuery("ingredients", trx).insertAndFetch(cleanedIngredient)
      return fetchedIngredient
    })
    return res.status(201).json("successful input")
  } catch(err) {
    if (err instanceof ValidationError || err instanceof NotNullViolationError) {
      return res.status(422).json({ errors: err.data})
    }
    return res.status(500).json({ err })
  }
})

ingredientsRouter.patch("/", async (req, res) => {
  const { editedIngredient, userId } = req.body
  const ingredientId = editedIngredient.id
  const cleanedIngredient = cleanUserInput(editedIngredient)

  try {
    const existingIngredient = await Ingredient.query().findOne({ name: cleanedIngredient.name })
    if (existingIngredient) {
      const ingredientInPantry = await User.relatedQuery("ingredients").for(userId).where({ name: cleanedIngredient.name })
      if (ingredientInPantry.length > 0) {
        const editedMeasurement = await User.transaction(async (trx) => {
          const measurement = await User.relatedQuery("pantryMeasurements", trx).for(userId).where("ingredientId", ingredientId)
          const editedMeasurement = await PantryMeasurement.query(trx).updateAndFetchById(measurement[0].id, {
            amount: cleanedIngredient.amount,
            unit: cleanedIngredient.unit,
            description: cleanedIngredient.description
          })
          return editedMeasurement
        })
        return res.status(201).json({ editedIngredient: existingIngredient})
      }

      const relatedIngredient = await User.transaction(async (trx) => {
        const measurement = await User.relatedQuery("pantryMeasurements", trx).for(userId).where("ingredientId", ingredientId)
        const deleted = await PantryMeasurement.query(trx).deleteById(measurement[0].id) 
        const user = await User.query(trx).findById(userId)
        const relatedIngredient = await user.$relatedQuery("ingredients", trx).relate({
          id: existingIngredient.id,
          amount: cleanedIngredient.amount,
          unit: cleanedIngredient.unit,
          description: cleanedIngredient.description
        })
        return relatedIngredient
      })
      return res.status(201).json({ editedIngredient: relatedIngredient })
    }

    const fetchedIngredient = await User.transaction(async (trx) => {
      const measurement = await User.relatedQuery("pantryMeasurements", trx).for(userId).where("ingredientId", ingredientId)
      const deleted = await PantryMeasurement.query(trx).deleteById(measurement[0].id)
      const user = await User.query(trx).findById(userId)
      const fetchedIngredient = await user.$relatedQuery("ingredients", trx).insertAndFetch(cleanedIngredient)
      return fetchedIngredient
    })
    return res.status(201).json({ editedIngredient: fetchedIngredient})
  } catch(err) {
    if (err instanceof ValidationError || err instanceof NotNullViolationError) {
      return res.status(422).json({ errors: err.data})
    }
    return res.status(500).json({ err })
  }
})

export default ingredientsRouter