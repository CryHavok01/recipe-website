import express from "express"
import { PantryMeasurement, Ingredient } from "../../../models/index.js"
import cleanNewRecipeData from "../../../services/cleanNewRecipeData.js"

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

recipesRouter.post("/new", async (req, res) => {
  const { newRecipe } = req.body
  const user = req.user;
  const { recipe, ingredients, steps } = cleanNewRecipeData(newRecipe)

  try {
    const existingRecipe = await user.$relatedQuery("recipes").findOne({ name: recipe.name })
    if (existingRecipe) {
      return res.status(422).json({ 
        errors: {
          "Looks like": [{
            message: "you already have this recipe in your Cookbook!  Please use a different name." 
          }]
        }
      })
    }
    
    const insertedRecipe = await user.$relatedQuery("recipes").insertAndFetch(recipe)
  
    for (const ingredient of ingredients) {
      const existingIngredient = await Ingredient.query().findOne({ name: ingredient.name })
      if(existingIngredient) {
        const newRelation = await insertedRecipe.$relatedQuery("ingredients").relate({
          id: existingIngredient.id,
          amount: ingredient.amount,
          unit: ingredient.unit,
          description: ingredient.description
        })
      } else {
        const newIngredient = await insertedRecipe.$relatedQuery("ingredients").insertAndFetch(ingredient)
      }
    }
  
    for (const step of steps) {
      const newStep = await insertedRecipe.$relatedQuery("recipeSteps").insertAndFetch({
        number: step.number,
        step: step.step,
        recipeId: insertedRecipe.id
      })
    }
    return res.status(200).json({ recipe: insertedRecipe })
  } catch(err) {
    return res.status(422).json({ err })
  }
})

export default recipesRouter