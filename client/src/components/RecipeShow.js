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
        <li key={ingredient.id}>
          <p>{ingredient.name}: {Number(ingredient.amount)} {ingredient.unit}</p>
          <p>{ingredient.description}</p>
        </li>
      )
    })
  }

  let stepsList
  if(recipe.steps) {
    stepsList = recipe.steps.map(step => {
      return(
        <div key={step.id}>
          <li>{step.step}</li>
        </div>
      )
    })
  }


  return(
    <div className="grid-container center">
      <h1 className="title">{recipe.name}</h1>
      <h2>{recipe.description}</h2>
      <div className="grid-x grid-margin-x left">
        <div className="cell medium-6 callout">
          <h3>Ingredients: </h3>
          <ul>
            {ingredientsList}
          </ul>
        </div>
        <div className="cell medium-6 callout">
          <h3>Instructions: </h3>
          <ol>
            {stepsList}
          </ol>
        </div>
      </div>
    </div>
  )
}

export default RecipeShow