import React, { useState, useEffect } from "react"
import { useParams } from "react-router"

const RecipeShow = (props) => {
  const [recipe, setRecipe] = useState({})

  const { id } = useParams()
  let userId
  if (props.user) {
    userId = props.user.id
  }

  const fetchRecipeDetails = async () => {
    try {
      const response = await fetch(`/api/v1/users/${userId}/recipes/${id}`)
      const body = await response.json()
      setRecipe(body.recipe)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    if (props.user) {
      fetchRecipeDetails()
    }
  }, [props.user])

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