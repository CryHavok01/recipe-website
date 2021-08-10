import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const SearchedRecipeShow = (props) => {
  const [recipe, setRecipe] = useState({})
  
  const { id } = useParams()

  const fetchRecipeApi = async () => {
    try {
      const response = await fetch(`/api/v1/recipe-search/${id}`)
      const body = await response.json()
      setRecipe(body.recipe)
    } catch(err) {
      console.err(`Error in fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    fetchRecipeApi()
  }, [])

  let ingredientsList
  if(recipe.extendedIngredients) {
    ingredientsList = recipe.extendedIngredients.map((ingredient, index) => {
      return(
        <li key={index}>
          {ingredient.originalString}
        </li>
      )
    })
  }

  let stepsList = []
  if(recipe.analyzedInstructions) {
    recipe.analyzedInstructions.forEach((instructionBlock, indexA) => {
      instructionBlock.steps.forEach((step, indexB) => {
        stepsList.push(
          <li key={`${indexA}${indexB}`}>
            {step.step}
          </li>
        )
      })
    })
  }

  return(
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={`A picture of ${recipe.title}`}/>
      <h3>Ingredients:</h3>
      <ul>
        {ingredientsList}
      </ul>
      <h3>Instructions:</h3>
      <ul>
        {stepsList}
      </ul>
      <a href={recipe.spoonacularSourceUrl} target="_blank">View the Recipe on Spoonacular</a>
    </div>
  )
}

export default SearchedRecipeShow