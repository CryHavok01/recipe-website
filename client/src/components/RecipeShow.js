import React, { useState, useEffect } from "react"
import { useParams } from "react-router"

const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({})

  const { id } = useParams()

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/recipes/${id}`)
      const body = await response.json()
      setRecipe(body.recipe)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
      fetchRecipeDetails()
  }, [])

  let ingredientsList
  if(recipe.ingredients) {
    ingredientsList = recipe.ingredients.map(ingredient => {
      return (
        <div key={ingredient.id}>
          <p>{ingredient.name}: {Number(ingredient.amount)} {ingredient.unit}</p>
          <p>{ingredient.description}</p>
        </div>
      )
    })
  }

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