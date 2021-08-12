import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import Ingredients from "../services/Ingredients"

const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({})
  const [recipeIngredients, setRecipeIngredients] = useState([])
  const [pantryIngredients, setPantryIngredients] = useState([])

  const { id } = useParams()

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/recipes/${id}`)
      const body = await response.json()
      setRecipe(body.recipe)
      setRecipeIngredients(body.recipe.ingredients)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  const fetchPantryIngredients = async () => {
    try {
      const response = await fetch(`/api/v1/users/ingredients/all`)
      const body = await response.json()
      setPantryIngredients(body.ingredients)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
      fetchRecipeDetails()
      fetchPantryIngredients()
  }, [])

  const compareIngredient = (ingredient, pantry) => {
    const ingredientInPantry = pantry.find(pantryIngredient => pantryIngredient.name.toLowerCase() === ingredient.name)
    if(ingredientInPantry) {
      if(ingredientInPantry.unit === ingredient.unit) {
        if(ingredientInPantry.amount >= ingredient.amount) {
          return "have enough"
        } else {
          return "need more"
        }
      } else {
        const convertedRecipeIngredient = Ingredients.convertIngredient(ingredient)
        const convertedPantryIngredient = Ingredients.convertIngredient(ingredientInPantry)
        if (!convertedRecipeIngredient || !convertedPantryIngredient) {
          return "can't tell"
        } else {
          if (convertedPantryIngredient - 3 >= convertedRecipeIngredient) {
            return "have enough"
          } else if (convertedPantryIngredient + 3 <= convertedRecipeIngredient) {
            return "need more"
          } else {
            return "it's close"
          }
        }
      }
    }
    return "don't have"
  }

  const ingredientsList = recipeIngredients.map(ingredient => {
    const ingredientInPantry = compareIngredient(ingredient, pantryIngredients)
    let amountNote
    if(ingredientInPantry === "don't have") {
      amountNote = <p className="red">It looks like you don't have this ingredient</p>
    } else if(ingredientInPantry === "need more") {
      amountNote = <p className="red">You don't have enough of this ingredient</p>
    } else if(ingredientInPantry === "can't tell") {
      amountNote = <p className="yellow">I can't tell if you have enough of this ingredient</p>
    } else if(ingredientInPantry === "it's close") {
      amountNote = <p className="yellow">You have just about enough, but you might run out of this ingredient</p>
    } else if(ingredientInPantry === "have enough") {
      amountNote = <p className="green">You have more than enough of this ingredient</p>
    }
      return (
        <div key={ingredient.id}>
          <p>{ingredient.name}: {Number(ingredient.amount)} {ingredient.unit}</p>
          <p>{ingredient.description}</p>
          {amountNote}
        </div>
      )
    })

  let stepsList
  if(recipe.steps) {
    stepsList = recipe.steps.map(step => {
      return(
        <div key={step.id}>
          <p>{step.number}: {step.step}</p>
        </div>
      )
    })
  }


  return(
    <div>
      <h1>{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      <h3>Ingredients: </h3>
      {ingredientsList}
      <h3>Instructions: </h3>
      {stepsList}
    </div>
  )
}

export default RecipeShow