import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const SearchedRecipeShow = (props) => {
  const [recipe, setRecipe] = useState({})
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])
  const [saved, setSaved] = useState(false)
  
  const { id } = useParams()

  const fetchRecipeApi = async () => {
    try {
      const response = await fetch(`/api/v1/recipe-search/${id}`)
      const body = await response.json()
      setRecipe(body.recipe)
      setIngredients(body.recipe.extendedIngredients)
      let stepsList = []
      body.recipe.analyzedInstructions.forEach(instructionBlock => {
        instructionBlock.steps.forEach(step => {
          stepsList.push(step)
        })
      })
      setSteps(stepsList)
    } catch(err) {
      console.err(`Error in fetch: ${err.message}`)
    }
  }
  
  const fetchSaved = async () => {
    if(recipe.id) {
      try {
        const response = await fetch(`/api/v1/recipe-search/saved?spoonacularId=${recipe.id}`)
        const body = await response.json()
        if(body.saved) {
          setSaved(true)
        }
      } catch(err) {
        console.err(`Error in fetch: ${err.message}`)
      }
    }
  }

  useEffect(() => {
    fetchRecipeApi()
  }, [])

  useEffect(() => {
    fetchSaved()
  }, [recipe])

  const handleSave = async (event) => {
    const recipeData = { 
      name: recipe.title,
      spoonacularId: recipe.id
    }
    const ingredientsData = ingredients.map(ingredient => {
      return {
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
        description: ingredient.originalString
      }
    })
    const stepsData = steps.map((step, index) => {
      return {
        number: index+1,
        step: step.step
      }
    })
    const newRecipeData = {
      recipe: recipeData,
      ingredients: ingredientsData,
      steps: stepsData
    }
    
    try {
      const response = await fetch("/api/v1/users/recipes", {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(newRecipeData)
      })
      if(response.ok) {
        setSaved(true)
      }
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const ingredientsList = ingredients.map((ingredient, index) => {
    return(
      <li key={index}>
        {ingredient.originalString}
      </li>
    )
  })

  const stepsList = steps.map((step, index) => {
    return(
      <li key={index}>
        {step.step}
      </li>
    )
  })

  let saveButton 
  if(saved) {
    saveButton = (
      <button className="button round">Recipe Saved!</button>
    )
  } else {
    saveButton = (
      <button className="button blue round" onClick={handleSave}>Save this Recipe</button>
    )
  }

  return(
    <div className="grid-container center">
      <h1 className="title">{recipe.title}</h1>
      <div className="grid-x margin-x">
        <div className="cell small-8">
          <img src={recipe.image} alt={`A picture of ${recipe.title}`}/>
        </div>
        <div className="cell small-2 text-middle">
          {saveButton}
        </div>
      </div>
      <div className="callout left">
        <h3>Ingredients:</h3>
        <ul>
          {ingredientsList}
        </ul>
      </div>
      <div className="callout left">
        <h3>Instructions:</h3>
        <ol>
          {stepsList}
        </ol>
      </div>
      <a href={recipe.spoonacularSourceUrl} target="_blank">View the Recipe on Spoonacular</a>
    </div>
  )
}

export default SearchedRecipeShow