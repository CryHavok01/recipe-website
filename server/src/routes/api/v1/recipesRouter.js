import express from "express"
import { PantryMeasurement, Ingredient, Recipe } from "../../../models/index.js"
import cleanNewRecipeData from "../../../services/cleanNewRecipeData.js"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"

const recipesRouter = new express.Router()

recipesRouter.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const recipe = await Recipe.query().findById(id)
    const serializedRecipe = await RecipeSerializer.getRecipeWithDetails(recipe)
    return res.status(200).json({ recipe: serializedRecipe })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

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

recipesRouter.delete("/", async (req, res) => {
  const user = req.user;
  const { recipeId } = req.body;
  try{
    const deleted = await user.$relatedQuery("favorites").delete().where("recipeId", recipeId)
    return res.status(200).json({ message: "Successful deletion" })
  } catch(error) {
    return res.status(500).json({ error })
  }
})

recipesRouter.patch("/edit", async (req, res) => {
  const user = req.user;
  const { editedRecipe } = req.body;
  const id = editedRecipe.id;
  const cleanedRecipe = cleanNewRecipeData(editedRecipe)
  console.log(id)
  console.log(cleanedRecipe)
  try {
    const currentRecipe = await Recipe.query().findById(id)
    const existingRecipe = await user.$relatedQuery("recipes").findOne({ name: editedRecipe.name })
    console.log(currentRecipe)
    console.log(existingRecipe)
    //trx for recipe, ingredients, steps
    if (existingRecipe && editedRecipe.name !== currentRecipe.name) {
      return res.status(422).json({ 
        errors: {
          "Looks like": [{
            message: "you already have a recipe with the same name in your cookbook!  Please edit that recipe instead, or create a new one." 
          }]
        }
      })
    }
    //if recipe has new recipe name, check for existing recipe in user cookbook.  If none, create new recipe, insert all ingredients, steps.  delete old favorite. delete old steps, delete old recipeMeasurements, delete old recipe.  If recipe exists, reject edit, send err that recipe already exists, please edit that recipe or use a different name.

    //if same name, update recipe details, update existing steps.  For each ingredient, check if same name or new name.  If same name, find original recipeMeasurement, delete, and insert new one.  If new name, find if ingredient exists.  If it exists, insert new recipeMeasurement.  If ingredient doesn't exist, insert new ingredient with measurements.
  } catch(err) {

  }
})

export default recipesRouter