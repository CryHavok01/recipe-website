import express from "express"
import { Ingredient, PantryMeasurement, User } from "../../../models/index.js"
import IngredientSerializer from "../../../serializers/IngredientSerializer.js"
import objection from "objection"
import cleanUserInput from "../../../services/cleanUserInput.js"
const { ValidationError, NotNullViolationError } = objection

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

ingredientsRouter.post("/", async (req, res) => {
  const { newIngredient, userId } = req.body
  const cleanedIngredient = cleanUserInput(newIngredient)
  try {
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

export default ingredientsRouter