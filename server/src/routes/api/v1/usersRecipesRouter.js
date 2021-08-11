import express from "express"
import RecipeSerializer from "../../../serializers/RecipeSerializer.js"
import { Ingredient, Recipe } from "../../../models/index.js"

const usersRecipesRouter = new express.Router({ mergeParams: true })

usersRecipesRouter.get("/", async (req, res) => {
  const user = req.user
  try {
    const recipes = await user.$relatedQuery("recipes")
    const serializedRecipes = recipes.map(ingredient => {
      return RecipeSerializer.getRecipeInfo(ingredient)
    })

    return res.status(200).json({ recipes: serializedRecipes })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

usersRecipesRouter.get("/:recipeId", async (req, res) => {
  const { recipeId } = req.params
  const user = req.user
  try {
    const recipes = await user.$relatedQuery("recipes").where("recipeId", recipeId)
    const serializedRecipe = await RecipeSerializer.getRecipeWithDetails(recipes[0])
    return res.status(200).json({ recipe: serializedRecipe })
  } catch(err) {
    return res.status(500).json({ err })
  }
})

usersRecipesRouter.post("/", async (req, res) => {
  const { recipe, ingredients, steps } = req.body
  const user = req.user
  try {
    const existingRecipe = await Recipe.query().findOne({ spoonacularId: recipe.spoonacularId })
    if(existingRecipe) {
      const newRelation = await user.$relatedQuery("recipes").relate(existingRecipe)
      return res.status(200).json({ recipe: existingRecipe })
    } else {
      const newRecipe = await user.$relatedQuery("recipes").insertAndFetch(recipe)
      for (const ingredient of ingredients) {
        const existingIngredient = await Ingredient.query().findOne({ name: ingredient.name })
        if(existingIngredient) {
          const newRelation = await newRecipe.$relatedQuery("ingredients").relate({
            id: existingIngredient.id,
            amount: ingredient.amount,
            unit: ingredient.unit,
            description: ingredient.description
          })
        } else {
          const newIngredient = await newRecipe.$relatedQuery("ingredients").insertAndFetch(ingredient)
        }
      }
      for (const step of steps) {
        const newStep = await newRecipe.$relatedQuery("recipeSteps").insertAndFetch({
          number: step.number,
          step: step.step,
          recipeId: newRecipe.id
        })
      }
      return res.status(200).json({ recipe: newRecipe })
    }
  } catch(err) {
    return res.status(500).json({ err })
  }
})

export default usersRecipesRouter